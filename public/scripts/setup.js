const statusValue = document.getElementById("statusValue");
const deviceDetails = document.getElementById("deviceDetails");
const deviceLogo = document.getElementById("deviceLogo");
const code = document.getElementById("code");
statusValue.innerText = "Offline";
statusValue.style.color = "red";
deviceDetails.innerText = "No device connected";
code.value = `<script src="tanuki.js"></script>
<script >
    window.portLayer = {
        port:${port}
    }
    
</script>`;

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

document.addEventListener("CONNECTION_ON", (e) => {
    setupUI(e);
});
