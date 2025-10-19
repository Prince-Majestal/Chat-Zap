import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3001});

wss.on("connection", ws=> {

    ws.on("message", message=> {
        const data = JSON.parse(message.toString())
        console.log(data.body)
        const newID = data.id + 1
        const newMessage = {id: newID, from: "Stranger", body: `You sent: ${data.body}`}
        ws.send(JSON.stringify(newMessage))
    })

    ws.on("close", ()=>{
        console.log("Connection with client terminated")
    })

    ws.on('error', (err) => {
        console.log("Client error", err);
    });
});

wss.on('error', (err) => {
        console.log("Server error", err);
    });
