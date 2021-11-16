const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quote")
const authorText = document.getElementById("author")
const twitterBtn = document.getElementById("twitter")
const newQuoteBtn = document.getElementById("new-quote")
const githubBtn = document.getElementById("github")
const loader = document.getElementById("loader")

let apiQuotes = []

function showLoadingSpinner() {
	loader.hidden = false
	quoteContainer.hidden = true
}

function removeLoadingSpinner() {
	loader.hidden = true
	quoteContainer.hidden = false
}

// Show New Quote
function newQuote() {
	showLoadingSpinner()
	// Pick a random quote from apiQuotes array
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
	if (!quote) {
		quoteText.textContent = "Something went wrong. Try again later."
		authorText.textContent = "better-quotes"
		removeLoadingSpinner()
	} else {
		// Update quoteText and authorText with new quote
		quoteText.textContent = quote.text
		// Check if Author field is blank and replace it with 'Unknown'
		if (!quote.author) authorText.textContent = "Unknown"
		else authorText.textContent = quote.author
		// Check Quote length to determine styling
		if (quote.text.length > 120) quoteText.classList.add("long-quote")
		else quoteText.classList.remove("long-quote")
		quoteText.textContent = quote.text
		removeLoadingSpinner()
	}
}

// Get Quotes From API
async function getQuotes() {
	showLoadingSpinner()
	const apiURL = "https://type.fit/api/quotes"
	try {
		const response = await fetch(apiURL)
		apiQuotes = await response.json()
		newQuote()
	} catch (error) {
		// Catch any errors for failed API calls
		quoteText.textContent = "Something went wrong. Try again later."
		authorText.textContent = "better-quotes"
		removeLoadingSpinner()
	}
}

// Tweet Quote
function tweetQuote() {
	const twitterURL = `https://twitter.com/intent/tweet?text="${quoteText.textContent}" - ${authorText.textContent}`
	window.open(twitterURL, "_blank")
}

// Go to GitHub Repo
function goToGithub() {
	const githubURL = "https://github.com/rzmk/better-quotes"
	window.open(githubURL, "_blank")
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote)
twitterBtn.addEventListener("click", tweetQuote)
githubBtn.addEventListener("click", goToGithub)

// Get Random Quote From API on Page Load
getQuotes()
