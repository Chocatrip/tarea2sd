var express = require("express");
var { Kafka } = require('kafkajs');

const port  = process.env.PORT;
const app = express();

app.use(express.json());


const kafka = new Kafka({
    brokers: [process.env.kafkaHost]
});

const ubicacion = async () =>{
    console.log("ubicacion >>")
    const consumer = kafka.consumer({ groupId: 'ubicacion', fromBeginning: true});
    await consumer.connect();
    await consumer.subscribe({topic : 'ubicacion', partition: '0'})
    await consumer.run({
        eachMEssage: async({topic, partition, message}) =>{
            console.log(`Ubicacion: ${message.ubicacion}`)
        }
    })
}

app.listen(port, ()=>{
    console.log(`Ubicacion topic, port: ${port}`)
    ubicacion();
});
