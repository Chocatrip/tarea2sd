var express = require("express");
var { Kafka } = require('kafkajs');

const port  = process.env.PORT;
const app = express();

app.use(express.json());


const kafka = new Kafka({
    brokers: [process.env.kafkaHost]
});

const registroventa = async () =>{
    console.log("registroventa >>")
    const consumer = kafka.consumer({ groupId: 'registroVenta', fromBeginning: true});
    await consumer.connect();
    await consumer.subscribe({topic : 'registroVenta'})
    await consumer.run({
        eachMEssage: async({topic, partition, message}) =>{
            console.log(`Registro venta: ${message.cliente}, ${message.qsopaipillas}, ${message.hora}, ${message.stock}, ${message.ubicacion}`)
        }
    })
}

app.listen(port, ()=>{
    console.log(`RegistroVenta topic, port: ${port}`)
    registroventa();
});
