function back() {
    location.href = "index.html";
}

window.addEventListener('DOMContentLoaded', () => {
    const contentContainer = document.getElementById('parsedText');

    const arguments = {
        DOCXPath: 'public/docs/about/text1.docx'
    }
  
    fetch('/parseDocx', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(arguments)
    })
      .then((response) => response.json())
      .then((data) => {
        contentContainer.innerHTML = data.content; // Use innerHTML to preserve HTML formatting
      })
      .catch((error) => {
        console.error('Error fetching content:', error);
      });
  });