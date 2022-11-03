var express = require("express");
var { Kafka } = require('kafkajs');

var app = express();
const port = process.env.port || 3000;

app.use(express.json());
const kafka = new Kafka({
    brokers: [process.env.kafkaHost]
});
const producer = kafka.producer();

app.get('/prueba', (req, res) =>{
    console.log("Prueba get api")
    return res.send('Prueba get api')
});

app.post('/rmiembro', async (req,res)=>{
    await producer.connect();
    console.log("/rmiembro >>")
    var tipoSopaipillero = req.body.tipo;

        await producer.send({
                topic: 'register',
                messages: [{value: JSON.stringify(req.body), partition: 1}]
            })
    return res.send('Test ok');

    // switch(tipoSopaipillero){
    //     case 0:
    //         await producer.send({
    //             topic: 'register',
    //             messages: [{value: JSON.stringify(req.body), partition: 1}]
    //         })
    //         return res.send('Sopaipillero normal registrado')
    //     case 1:
    //         await producer.send({
    //             topic: 'register',
    //             messages: [{value: JSON.stringify(req.body), partition: 0}]
    //         })
    //         return res.send('Sopaipillero premium registrado')
    // }   
    
});

app.post('/rventa', async(req,res)=> {

});

app.post('/aextrano', async(req,res)=> {

});
app.listen(3000, () =>{
    console.log(`Server running on localhost:${port}`)
});