(function () {
  //Initial references
  let alarms = [];
  const timer = document.getElementById("time");
  const hourInput = document.getElementById("hour-input");
  const minuteInput = document.getElementById("minute-input");
  const secondInput = document.getElementById("second-input");
  const activeAlarms = document.querySelector("#active-alarms");
  const setAlarm = document.getElementById("set");
  const session = document.getElementById("session");
  const selectMenu = document.querySelectorAll("select");

  let alarmSound = new Audio("./alarm.mp3");

  // for handling single digit time
  const handleTime = (time) => (time < 10 ? "0" + time : time);
  // function for displaying current time and updating the inner html text every 1 second
  const currentTime = () => {
    let date = new Date();
    // for extracting the hour,minute and second
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let session = "AM";

    // changing sessions after 12 hour
    //   resetting the time to 12 again
    if (hour == 0) {
      hour = 12;
    }
    if (hour > 12) {
      hour = hour - 12;
      session = "PM";
    }
    // passing the time in handle time to append 0
    hour = handleTime(hour);
    minute = handleTime(minute);
    second = handleTime(second);

    let time = hour + ":" + minute + ":" + second + " " + session;

    timer.innerText = time;
    alarms.forEach((alarm, index) => {
      if (alarm.isActive) {
        if (`${alarm.time}` === `${time}`) {
          alarmSound.play();
          // alarmSound.loop = true;
          alert("ZZZZZZzzz.... ");
        }
      }
    });
    setTimeout(currentTime, 1000);
  };
  function addAlarm(alarm) {
    alarms.push(alarm);
    renderAlarms();
    console.log(alarms, "ADD ALARM FUNCTION");
    return;
  }

  function addAlarmToDOM(alarm) {
    const li = document.createElement("li");
    li.innerHTML = `
    <input
    type="checkbox"
    id="${alarm.id}"
    ${alarm.isActive ? "checked" : ""}
    class="custom-checkbox"
    />
    
    <label for="${alarm.id}">${alarm.time}</label>
    <i class="fa-solid fa-trash-can" data-id="${alarm.id}" ></i>

    `;
    activeAlarms.append(li);
  }
  function renderAlarms() {
    activeAlarms.innerHTML = "";
    for (let i = 0; i < alarms.length; i++) {
      addAlarmToDOM(alarms[i]);
    }
  }
  function deleteAlarm(alarmId) {
    const newAlarms = alarms.filter((alarm) => {
      return alarm.id !== Number(alarmId);
    });
    alarms = newAlarms;

    renderAlarms();
  }
  function setAlarmHandler(e) {
    let time =
      hourInput.value +
      ":" +
      minuteInput.value +
      ":" +
      secondInput.value +
      " " +
      session.value;
    if (time === "00:00:00 AM") {
      alert("Enter a valid time");
      return;
    }
    const alarm = {
      time: time,
      id: Date.now(),
      isActive: true,
    };
    console.log(alarm, "ADD HANDLER FUNCTION");
    addAlarm(alarm);
  }
  function toggleAlarm(alarmId) {
    const alarm = alarms.filter((alarm) => {
      return alarm.id === Number(alarmId);
    });
    if (alarm.length > 0) {
      const currentAlarm = alarm[0];
      currentAlarm.isActive = !currentAlarm.isActive;
      renderAlarms();
      return;
    }
  }

  // for handling clicks on checkbox and delete button
  function handleClickListner(e) {
    const target = e.target;
    // if the used has clicked on the delete button
    if (target.className === "fa-solid fa-trash-can") {
      const alarmId = target.dataset.id;
      deleteAlarm(alarmId);
      return;
    }
    // if the used has clicked on the checkbox button
    else if (target.className === "custom-checkbox") {
      const alarmId = target.id;
      toggleAlarm(alarmId);
      return;
    }
  }
  // for setting all hour,minute and second values in dropdown
  for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
  }

  for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
  }
  for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
  }
  for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[3].firstElementChild.insertAdjacentHTML("afterend", option);
  }

  function initializeApp() {
    currentTime();
    setAlarm.addEventListener("click", setAlarmHandler);
    document.addEventListener("click", handleClickListner);
  }

  initializeApp();
})();
