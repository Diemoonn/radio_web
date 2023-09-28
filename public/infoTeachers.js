const fetchImageFilenames = (args, id) => {
    fetch('/parseImage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(args)
      }
    )
    .then((response) => response.json())
    .then((filename) => {
        console.log('Wanna parse that img: ', filename);
        let imageUrl = 'images/teachers/buttons/' + id + "/profilePic/" + filename;
        let container = document.getElementById('imgContainer');
        container.src = imageUrl;
    })
    .catch((error) => {
        console.error('Error fetching image filenames:', error);
    });
}

function loadProfilePic() {
    let targetId = localStorage.getItem('targetId');

    const args = {
        imageFolder: 'public/images/teachers/buttons/' + targetId + '/profilePic'
    };

    fetchImageFilenames(args, targetId);
}

loadProfilePic();