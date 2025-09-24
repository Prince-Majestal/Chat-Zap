import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3001});

wss.on("connection", ws=> {

    ws.send("This is the server. Connexion with backend established.");

    ws.on("message", message=> {
        console.log(message.toString())
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
