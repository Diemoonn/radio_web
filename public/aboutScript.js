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
    const contentContainer = document.getElementById('parsedText');
    const contentContainer2 = document.getElementById('parsedText2');
    const contentContainer3 = document.getElementById('parsedText3');

    const arguments = {
        DOCXPath: 'public/docs/about/text1.docx'
    }
  
    parseDocx(arguments, contentContainer);

    const args = {
      DOCXPath: 'public/docs/about/text2.docx'
    }

    parseDocx(args, contentContainer2);

    const args2 = {
      DOCXPath: 'public/docs/about/text3.docx'
    }

    parseDocx(args2, contentContainer3);
});