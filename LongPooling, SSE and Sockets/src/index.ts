import express, { type Request, type Response } from "express"
import cors from "cors"
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors());

app.get("/events",(req:Request,res:Response)=>{
    res.writeHead(200,{
        "Content-type":"text/event-stream",
        "Cache-control":"no-cache",
        connection:"keep-alive"
    })

    

const interval = setInterval(()=>{
    res.write(`data: ${Date.now()}\n\n`);
},2000)

req.on("close",()=>{
    clearInterval(interval);
    res.end();
})

})

app.listen(PORT,()=>{
    console.log(`Server running on port: ${PORT}`);
}
)
