const generatePort = () => {
    const url = new URL(window.location.href);
    return url.port;
};
let port = generatePort();
let sockets = new WebSocket(`ws://127.0.0.1:${port}`);

const eventLibrary = {
    connectionOn: "CONNECTION_ON",
};

sockets.onopen = () => {
    console.log("Socket connection from master opened");
    const senderData = {
        type: "connection_establishment",
        from: "master",
    };
    sockets.send(JSON.stringify(senderData));
};

sockets.onmessage = (e) => {
    const incomingMessage = JSON.parse(e.data);
    console.log(incomingMessage);
    if (
        incomingMessage?.type == "connection_establishment" &&
        incomingMessage?.from == "client"
    ) {
        const connectionEvent = new CustomEvent(eventLibrary.connectionOn, {
            detail: {
                state: "Connected",
                type: incomingMessage?.deviceData?.device?.type,
                info: `${incomingMessage?.device?.client.name} ${incomingMessage?.device?.client.type} on ${incomingMessage?.device?.device?.type} with ${incomingMessage?.device?.os?.name} ${incomingMessage?.device?.os.version}`,
            },
        });
        document.dispatchEvent(connectionEvent);
    } else if (incomingMessage?.type == "console") {
        console.log("dispatch");
        const logEvent = new CustomEvent("CONSOLE", {
            detail: { ...incomingMessage },
        });
        document.dispatchEvent(logEvent);
    }
};
