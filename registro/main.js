var express = require("express");
var { Kafka } = require('kafkajs');

const port  = process.env.PORT;
const app = express();

app.use(express.json());


const kafka = new Kafka({
    brokers: [process.env.kafkaHost]
});

const registro = async () =>{
    console.log("registro >>")
    const consumer = kafka.consumer({ groupId: 'register', fromBeginning: true});
    await consumer.connect();
    await consumer.subscribe({topic : 'register'})
    await consumer.run({
        eachMEssage: async({topic, partition, message}) =>{
            if(partition === 0){
                console.log("Topic register normal")
            }else{
                console.log("Topic register premium")
            }   
        }
    })
}

app.listen(port, ()=>{
    console.log(`Register topic, port: ${port}`)
    registro();
});
