function back() {
    location.href = "teachers.html";
}

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
        let imageUrl = 'images/teachers/buttons/' + id + '/profilePic/' + filename;
        let container = document.getElementById('imgContainer');
        container.src = imageUrl;
    })
    .catch((error) => {
        console.error('Error fetching image filenames:', error);
    });
}

let qrError = false;

const fetchTeacherQr = (args, id) => {
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
        let imageUrl = 'images/teachers/buttons/' + id + '/qr.png';
        let container = document.getElementById('qrContainer');
        container.src = imageUrl;
    })
    .catch((error) => {
        console.error('Error fetching qr filenames:', error);

        qrError = true;
    });
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
        container.innerHTML = data.content;
    })
    .catch((error) => {
        console.error('Error fetching content:', error);
    });
}

const loadProfilePic = () => {
    let targetId = localStorage.getItem('targetId');

    const args = {
        imageFolder: 'public/images/teachers/buttons/' + targetId + '/profilePic'
    };

    const qrArgs = {
        imageFolder: 'public/images/teachers/buttons/' + targetId
    };

    fetchImageFilenames(args, targetId);
    fetchTeacherQr(qrArgs, targetId);
}

const loadProfileText = () => {
    let targetId = localStorage.getItem('targetId');

    const nameContainer = document.getElementById('nameContainer');
    const infoContainer = document.getElementById('infoContainer');

    const infoArgs = {
        DOCXPath: 'public/docs/teachers/buttons/' + targetId + '/info.docx'
    }
    
    parseDocx(infoArgs, infoContainer);

    const nameArgs = {
        DOCXPath: 'public/docs/teachers/buttons/' + targetId + '/name.docx'
    };

    parseDocx(nameArgs, nameContainer);
}

const setProfileStroke = () => {
    const targetId = localStorage.getItem('targetId');
    const profilePic = document.getElementById('imgContainer');

    if (targetId % 2 === 0) {
        profilePic.style = "border: 0.1vw solid #E5194A;";
    } else {
        profilePic.style = "border: 0.1vw solid #154478;";
    }
}

const setupQrBox = (args) => {
    fetch('/checkIfFileExist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(args)
    })
    .catch((error) => {
        console.log('qr error: ', error);

        qrError = true;
    });

    let triggerBox = document.getElementById('qrBox');
    if (qrError)
    {
        triggerBox.innerHTML = "";
    }
}

window.addEventListener('DOMContentLoaded', () => {
    loadProfilePic();
    loadProfileText();
    setProfileStroke();
});