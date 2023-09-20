function timetable() {
    location.href = "timetable.html";
}

function getTime() {
    // get current system date
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    // add '0' in front of date's digit if it less 10
    hh = (hh < 10) ? "0" + hh : hh;
    mm = (mm < 10) ? "0" + mm : mm;

    // compute month's name
    let monthName = "";
    switch (month) {
        case 0:  monthName = "Января"; break;
        case 1:  monthName = "Февраля"; break;
        case 2:  monthName = "Марта"; break;
        case 3:  monthName = "Апреля"; break;
        case 4:  monthName = "Мая"; break;
        case 5:  monthName = "Июня"; break;
        case 6:  monthName = "Июля"; break;
        case 7:  monthName = "Августа"; break;
        case 8:  monthName = "Сентября"; break;
        case 9:  monthName = "Октября"; break;
        case 10:  monthName = "Ноября"; break;
        case 11:  monthName = "Декабря"; break;
    }

    // decide the week type
    let startDate = new Date(date.getFullYear(), 0, 1);

    let days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));     
    let weekNumber = Math.ceil(days / 7);
    let week = (weekNumber % 2 == 0 ? "Знаменатель" : "Числитель");

    // compute final time statement
    let time = week + " <br> " + hh + ":" + mm + ", " + day + " " + monthName + " " + year;

    console.log(time);

    // assign time statement to the clock
    let watch = document.getElementById("clockText");
    if (watch) {
        document.getElementById("clockText").innerHTML = time;
    }

    // update the clock
    let t = setTimeout(function(){ getTime() }, 1000);
}

getTime();