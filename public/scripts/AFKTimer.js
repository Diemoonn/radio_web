// Define the idle time in milliseconds (3 minutes)
const idleTime = 3 * 60 * 1000;

let timeoutId;

// Function to reset the idle timer
function resetTimer() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(redirectToURL, idleTime);
}

// Function to redirect to the specified URL
function redirectToURL() {
    window.location.href = 'index.html';
}

// Add event listeners to reset the timer on user interaction
window.addEventListener('mousemove', resetTimer);
window.addEventListener('keydown', resetTimer);

// Initialize the timer when the page loads
resetTimer();