import express, { type Request, type Response } from "express"
import cors from "cors"
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors());

let i = 0;
function send(res:Response){

    res.write(`data: ${Date.now()}\n\n`)
    setTimeout(()=>send(res),1000);
    
}

app.get("/events",(req:Request,res:Response)=>{
    res.writeHead(200,{
        "Content-type":"text/event-stream",
        "Cache-control":"no-cache",
        connection:"keep-alive"
    })

    
send(res)

req.on("close",()=>{
  
    res.end();
})

})

app.listen(PORT,()=>{
    console.log(`Server running on port: ${PORT}`);
}
)
