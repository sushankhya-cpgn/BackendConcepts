import {Queue} from "bullmq"
import { type RedisOptions } from 'ioredis';

// Redis connection configuration for Docker
const redisConfig: RedisOptions = {
    host: 'host.docker.internal', // Use this for Docker on Windows/Mac
    port: 6379,                   // Default Redis port
};


const notificationQueue = new Queue('emailQueue',{
    connection:redisConfig
});

export async function init(){
    const res = await notificationQueue.add('emailtosc',
        {
            email:'sc@gmail.com',
            subject:'Welcome',
            body:"Welcome Sushankhya",
        });

        console.log("Job added to Queue",res.id);
}
