function back() {
    location.href = "science.html";
}

const parseDocx = (args, container) => {
    fetch('/parseDocx', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(args)
    })
    .then((response) => response.json())
    .then((data) => {
      container.innerHTML = data.content; // Use innerHTML to preserve HTML formatting
    })
    .catch((error) => {
      console.error('Error fetching content:', error);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('parsedText');

    const args = {
        DOCXPath: 'public/docs/infoScience/1.docx'
    };

    parseDocx(args, container);
});