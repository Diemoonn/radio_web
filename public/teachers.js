function back() {
    location.href = "index.html";
}

const redirect = (event) => {
    // Define what button has been detected
    let targetId = event.target.id;
    localStorage.setItem('targetId', targetId);

    // And then redirect to the corresponding page
    location.href = "infoTeachers.html";
}

const setupButtons = () => {
    let button;

    for (let i = 1; i <= 15; i++) {
        button = document.getElementById(i);
        button.addEventListener("click", redirect);
    }
}

window.onload = () => { setupButtons(); };