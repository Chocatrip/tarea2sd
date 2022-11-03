var express = require("express");
var { Kafka } = require('kafkajs');
var fs = require("fs")

const port  = process.env.port;
const app = express();

app.use(express.json());

const kafka = new Kafka({
    brokers: [process.env.kafkaHost]
});

const registro = async () =>{
    const consumer = kafka.consumer({ groupId: 'register', fromBeginning: true});
    await consumer.connect();
    await consumer.suscribe({topic : 'register'})
    await consumer.run({
        eachMEssage: async({topic, partition, message}) =>{
            var content = "test";
            fs.writeFile('./test.txt', content, err => {
                if (err){
                    console.error(err);
                }
            });
        }
    })
}