import {Worker} from "bullmq"
import IORedis,{type RedisOptions} from 'ioredis';

const redisConfig: RedisOptions = {
    host: 'host.docker.internal', // Use this for Docker on Windows/Mac
    port: 6379,                   // Default Redis port
};



const sendEmail = (ms:number)=>{
return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
        
    })
}
const worker = new Worker("emailQueue",async job=>{
    console.log(`Message Id is ${job.id}`);
    console.log('Procesing message');
    console.log(`Sending email to ${job.data.email}`)
    sendEmail(5000);
    
},{connection:redisConfig})