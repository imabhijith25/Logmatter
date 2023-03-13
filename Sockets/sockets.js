let DeviceDetector = require("device-detector-js");
let master;
let client;
const connection = (ws) => {
    try {
        console.log("connection opened");
        ws.on("message", function message(data) {
            const msg = JSON.parse(data);
            if (
                msg.type === "connection_establishment" &&
                msg.from == "client"
            ) {
                //save client and send to master the details of client
                client = ws;
                if (master) {
                    console.log(msg);
                    const deviceDetector = new DeviceDetector();
                    const parsed = deviceDetector.parse(msg.device);
                    const msgCopy = { ...msg, device: parsed };
                    master.send(JSON.stringify(msgCopy));
                }
            } else if (
                msg.type == "connection_establishment" &&
                msg.from == "master"
            ) {
                //during connection establishment check if client already is there
                //if its there then it means that it has been refreshed
                master = ws;
                if (client) {
                    reconnectMsg = {
                        type: "reconnect_session",
                        from: "master",
                    };
                    client.send(JSON.stringify(reconnectMsg));
                }
            } else if (msg.type == "console") {
                if (master) {
                    master.send(JSON.stringify(msg));
                }
            }
        });
    } catch (e) {
        console.log("Socket connection failed");
    }
};

const socketEstablisher = (wss) => {
    wss.on("connection", (ws) => {
        connection(ws);
    });
};
module.exports = socketEstablisher;
