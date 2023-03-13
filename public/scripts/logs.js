const statusValue = document.getElementById("statusValue");
const deviceDetails = document.getElementById("deviceDetails");
const deviceLogo = document.getElementById("deviceLogo");
const code = document.getElementById("code");
statusValue.innerText = "Offline";
statusValue.style.color = "red";
deviceDetails.innerText = "No device connected";
const logginArea = document.getElementById("logginArea");
const expandedArea = document.querySelector(".expandedView");
const jsonValue = document.querySelector(".jsonvalue");
const fullState = [];

const setupUI = (e) => {
    statusValue.innerText = e.detail.state;
    statusValue.style.color = "green";
    deviceDetails.innerText = e.detail.info;
    if (e.detail.type == "desktop") {
        deviceLogo.src = "/images/monitor.svg";
    } else {
        deviceLogo.src = "/images/smartphone.svg";
    }
};

const handleDivClick = (currentValue) => {
    let logDetails = fullState[currentValue - 1];
    expandedArea.style.display = "block";
    jsonValue.innerText = JSON.stringify(logDetails.value[0], null, 2);
};

const setupLogs = (e) => {
    let logState = e.detail;
    fullState.push(logState);
    const div = document.createElement("div");

    div.setAttribute("data-key-value", fullState.length);
    const logDisplayValue = JSON.stringify(logState.value[0]);
    div.className = "logs";
    div.innerHTML = `<span>${logState.timestamp}</span> <p>${logDisplayValue}...</p>`;
    div.onclick = () => {
        handleDivClick(div.getAttribute("data-key-value"));
    };
    logginArea.appendChild(div);
};

document.addEventListener("CONNECTION_ON", (e) => {
    setupUI(e);
});

document.addEventListener("CONSOLE", (e) => {
    console.log(e.detail);
    setupLogs(e);
});
