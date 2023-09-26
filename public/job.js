let imagesFilenames = []; // Array to store image filenames
let currentImageIndex = 0; // Keep track of the current image index

const fetchImageFilenames = (args) => {
    fetch('/parseImage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(args)
      }
    )
      .then((response) => response.json())
      .then((filenames) => {
        imagesFilenames = filenames;
        fetchAndDisplayImage(currentImageIndex); // Fetch and display the first image
      })
      .catch((error) => {
        console.error('Error fetching image filenames:', error);
    });
}

// Function to fetch and display a specific image from the array
function fetchAndDisplayImage(index) {
    if (index < 0 || index >= imagesFilenames.length) {
      // Invalid index, do nothing
      return;
    }
  
    const imageUrl = imagesFilenames[index];
    const imageElement = document.getElementById('parsedImage');
    imageElement.src = 'images/job/promo/' + imageUrl;
  
    currentImageIndex = index; // Update the current image index
}

// Function to display the next image
function displayNextImage() {
    currentImageIndex = (currentImageIndex + 1) % imagesFilenames.length;
    fetchAndDisplayImage(currentImageIndex);
}
  
  // Function to display the previous image
function displayPreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + imagesFilenames.length) % imagesFilenames.length;
    fetchAndDisplayImage(currentImageIndex);
}

// Path to the images folder
const args = {
    imageFolder: 'public/images/job/promo'
};
  
// Call the function to fetch image filenames when the page loads
window.onload = fetchImageFilenames(args);

function headerLayout() {
    
}