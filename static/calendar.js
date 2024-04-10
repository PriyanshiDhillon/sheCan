document.addEventListener("DOMContentLoaded", function () {
  const calendar = document.querySelector("#calendar");
  const monthBanner = document.querySelector("#month");
  let navigation = 0;
  let clicked = null;
  let events = localStorage.getItem("events")
    ? JSON.parse(localStorage.getItem("events"))
    : [];
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function buttons() {
    const btnBack = document.querySelector("#btnBack");
    const btnNext = document.querySelector("#btnNext");
    const create = document.querySelector("#createEventButton");

    create.addEventListener("click", () => {
      $("#myModal").modal("show"); // Show the modal when the button is clicked
      createEvent();
    });

    btnBack.addEventListener("click", () => {
      navigation--;
      loadCalendar();
    });

    btnNext.addEventListener("click", () => {
      navigation++;
      loadCalendar();
    });
  }

  const myInput = document.getElementById("startDate");

  $("#myModal").on("shown.bs.modal", function () {
    myInput.focus();
  });

  function createEvent() {
    const startDate = new Date(document.getElementById("startDate").value); // Convert start date to Date object
    const duration = parseInt(document.getElementById("duration").value); // Parse duration to integer
    const endDate = calculateEndDate(startDate, duration);
    console.log(startDate);
    console.log(endDate);
    highlightDatesInRange(startDate.getDate(), endDate.getDate()); // Highlight dates in range with pink color
  }

  function calculateEndDate(startDate, duration) {
    // Clone the start date to avoid modifying the original object
    const endDate = new Date(startDate);

    // Add the duration in days to the start date
    endDate.setDate(endDate.getDate() + duration);

    return endDate;
  }

  function highlightDatesInRange(startDate, endDate) {
    // Select all the day elements
    const dayElements = document.querySelectorAll(".day");
    console.log(startDate+14)

    // Loop through each day element
    dayElements.forEach((day) => {
      if (parseInt(day.innerText) >= startDate && parseInt(day.innerText)<=endDate-1) {
        day.classList.add("highlightedPink");
      }
      if (parseInt(day.innerText) >= startDate + 14 && parseInt(day.innerText) <= startDate + 21) {
        day.classList.add("highlightedBlue");
    }
    

    });
  }

  function loadCalendar() {
    const dt = new Date();

    if (navigation != 0) {
      dt.setMonth(new Date().getMonth() + navigation);
    }
    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();
    monthBanner.innerText = `${dt.toLocaleDateString("en-us", {
      month: "long",
    })} ${year}`;
    calendar.innerHTML = "";
    const dayInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayofMonth = new Date(year, month, 1);
    const dateText = firstDayofMonth.toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    const dayString = dateText.split(", ")[0];
    const emptyDays = weekdays.indexOf(dayString);

    for (let i = 1; i <= dayInMonth + emptyDays; i++) {
      const dayBox = document.createElement("div");
      dayBox.classList.add("day");
      const monthVal = month + 1 < 10 ? "0" + (month + 1) : month + 1;
      const dateVal =
        i - emptyDays < 10 ? "0" + (i - emptyDays) : i - emptyDays;
      const dateText = `${dateVal}-${monthVal}-${year}`;
      if (i > emptyDays) {
        dayBox.innerText = i - emptyDays;
        //Event Day
        const eventOfTheDay = events.find(
          (e) =>
            e.start === dateText || (e.start < dateText && e.end >= dateText)
        );

        if (i - emptyDays === day && navigation == 0) {
          dayBox.id = "currentDay";
        }

        if (eventOfTheDay) {
          const eventDiv = document.createElement("div");
          eventDiv.classList.add("event");
          eventDiv.innerText = eventOfTheDay.title;
          dayBox.appendChild(eventDiv);
        }
      } else {
        dayBox.classList.add("plain");
      }
      calendar.append(dayBox);
    }
  }

  

  buttons();
  loadCalendar();
});
