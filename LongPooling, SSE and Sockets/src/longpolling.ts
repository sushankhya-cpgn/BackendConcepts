
// Long Pooling
import express from "express";
import cors from "cors";
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors())

let clients: express.Response[] = [];
let messages: string[] = [];

app.post("/messages", (req, res) => {
    const message = req.body.message;
    if (message && typeof message === "string") {
        if (clients.length > 0) {
            // Deliever immediately to waiting clients
            clients.forEach((clientRes, index) => {
                try {
                    clientRes.status(200).json({ message: message });
                }
                catch (error) {
                    console.log(`Failed to send the client ${index} `, error);
                }
            })
            clients = [];
        }
        else {
            // No waiting clients then add to queue
            messages.push(message);
        }
        return res.status(200).json({ message: "Message delievered successfully", waitingClients: clients.length, queuedMessage: messages.length });
    }

    else {
        return res.status(400).json({ message: "Enter valid messaage" });
    }
})

app.get("/poll", (req, res) => {
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");

    //if there are queued message send immediately

    if (messages.length > 0) {
        const message = messages.shift();
        return res.json({
            message: message,
            timeStamp: new Date().toISOString(),
            fromQueue: true
        });
    }

    // if not push the response in client array
    clients.push(res);
    console.log(`Clients connected. Total waiting ${clients.length}`)

    const cleanup = () => {
        clients = clients.filter((c) => c!==res);
    }

    req.on("close",cleanup);
    req.on("end",cleanup);

    // 30 seconds timeout
    const timeout = setTimeout(()=>{
        if(clients.includes(res)){
            clients = clients.filter((c)=> c!==res);
            try{
                res.json({message:null,timeStamp:new Date().toISOString(),timeout:true});
            }
            catch(error){
                console.log("Error sending timeout response",error);
            }
        }
    },30000)
    req.on("close",()=>clearTimeout(timeout));
})

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})