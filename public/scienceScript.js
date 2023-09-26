function back() {
    location.href = "index.html";
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
    const container2 = document.getElementById('parsedText2');
    const container3 = document.getElementById('parsedText3');

    const args = {
        DOCXPath: 'public/docs/science/1.docx'
    };

    const args2 = {
        DOCXPath: 'public/docs/science/2.docx'
    };

    const args3 = {
        DOCXPath: 'public/docs/science/3.docx'
    };

    parseDocx(args, container);
    parseDocx(args2, container2);
    parseDocx(args3, container3);
});