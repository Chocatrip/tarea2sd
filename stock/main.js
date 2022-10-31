var express = require("express");
var { Kafka } = require('kafkajs');

const port  = process.env.PORT;
const app = express();

app.use(express.json());


const kafka = new Kafka({
    brokers: [process.env.kafkaHost]
});

const stock = async () =>{
    console.log("stock >>")
    const consumer = kafka.consumer({ groupId: 'stock', fromBeginning: true});
    await consumer.connect();
    await consumer.subscribe({topic : 'stock'})
    await consumer.run({
        eachMEssage: async({topic, partition, message}) =>{
            console.log(`Stock: ${message.stock}`)
        }
    })
}

app.listen(port, ()=>{
    console.log(`Stock topic, port: ${port}`)
    stock();
});
