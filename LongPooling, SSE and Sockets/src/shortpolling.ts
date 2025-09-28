import express from "express";
const app = express();
const PORT = 3000;
app.use(express.json());

let messages:string[] = [];

app.use("/message",(req,res)=>{
    const message = req.body.message;
    if(message && typeof message === "string"){
        res.status(200).json({message:message})
    }
})

app.use("/poll",(req,res)=>{
    if(messages.length>0){
        const message = messages.shift();
        return res.json({message:message,timeStamp:new Date().toISOString()});
    }
    else{
        return res.json({message:null,timeStamp:new Date().toISOString()});
    }
})