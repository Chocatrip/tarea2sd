var express = require("express");
var { Kafka } = require('kafkajs');

var app = express();
const port = process.env.PORT;

app.use(express.json());

const kafka = new Kafka({
    brokers: [process.env.kafkaHost]
});

const producer = kafka.producer();

app.get('/prueba', (req, res) =>{
    console.log("Pruebaaaaaa get api")
    return res.send('Pruebaaaaaaaaaaa get api')
});

app.post('/rmiembro', async (req,res)=>{
    console.log("/rmiembro >>")
    
    await producer.connect();
    var tipoSopaipillero = req.body.tipo;

    switch(tipoSopaipillero){
        case 0:
            await producer.send({
                topic: 'register',
                messages: [{value: JSON.stringify(req.body)}],
                partition: 0
            })
            console.log("Registro Normal")
            producer.disconnect().then(() =>{
                return res.send('Post Request Test')
            })
        case 1:
            await producer.send({
                topic: 'register',
                messages: [{value: JSON.stringify(req.body)}],
                partition: 1
            })
            console.log("Registro Premium")
            producer.disconnect().then(() =>{
                return res.send('Post Request Test')
            })
    }   
    
});

app.post('/venta', async (req,res)=>{
    console.log("/venta >>")
    
    await producer.connect();
	await producer.send({
                topic: 'registroVenta',
                messages: [{value: JSON.stringify(req.body)}],
                partition: 0
            })
            console.log("Registro Venta")
            producer.disconnect().then(() =>{
                return res.send('Post Request Test')
	})

    
});

app.post('/agentextra', async (req,res)=>{
    console.log("/agentextra >>")
    
    await producer.connect();
	await producer.send({
                topic: 'ubicacion',
                messages: [{value: JSON.stringify(req.body)}],
                partition: 1
            })
            console.log("Ubicacion Partition 1")
            producer.disconnect().then(() =>{
                return res.send('Post Request Test')
	})

    
});

app.post('/stock', async (req,res)=>{
    console.log("/stock >>")
    
    await producer.connect();
	await producer.send({
                topic: 'stock',
                messages: [{value: JSON.stringify(req.body)}],
                partition: 0
            })
            console.log("Topic Stock")
            producer.disconnect().then(() =>{
                return res.send('Post Request Test')
	})

    
});

app.post('/ubicacion', async (req,res)=>{
    console.log("/ubicacion >>")
    
    await producer.connect();
	await producer.send({
                topic: 'ubicacion',
                messages: [{value: JSON.stringify(req.body)}],
                partition: 0
            })
            console.log("Topic Ubicacion partition 0")
            producer.disconnect().then(() =>{
                return res.send('Post Request Test')
	})

    
});

app.listen(3000, () =>{
    console.log(`Server running on localhost:${port}`)
});
