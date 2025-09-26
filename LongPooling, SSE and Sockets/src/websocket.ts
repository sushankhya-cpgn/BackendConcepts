import { WebSocketServer } from "ws";

const server = new WebSocketServer({
    port: 3000
})

const clients = new Set();

server.on("connection",(socket)=>{
    clients.add(socket);

    socket.on("message",(message)=>{
        clients.forEach((client:any)=>{
            if(client!==socket && client.readyState === WebSocket.OPEN){
                client.send(message);
            }
        })
    })
    
    socket.on("close",()=>{
    clients.delete(socket);
})
})


