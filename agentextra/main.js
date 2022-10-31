var express = require("express");
var { Kafka } = require('kafkajs');

const port  = process.env.PORT;
const app = express();

app.use(express.json());


const kafka = new Kafka({
    brokers: [process.env.kafkaHost]
});

const agentextra = async () =>{
    console.log("agentextra >>")
    const consumer = kafka.consumer({ groupId: 'ubicacion', fromBeginning: true});
    await consumer.connect();
    await consumer.subscribe({topic : 'ubicacion', partition: '1'})
    await consumer.run({
        eachMEssage: async({topic, partition, message}) =>{
            console.log(`Ubicacion Agente Extrano: ${message.ubicacion}`)
        }
    })
}

app.listen(port, ()=>{
    console.log(`Ubicacion-Agentextra topic, port: ${port}`)
    agentextra();
});
