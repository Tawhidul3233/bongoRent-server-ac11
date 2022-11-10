const express = require('express');
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;


// medill wares

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kbyx5ha.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
     try{
          const servicesCollection = client.db('bongorent').collection('services')

          app.get('/services', async(req, res)=>{
               const query = {}
               const cursor = servicesCollection.find(query)
               const services = await cursor.limit(3).toArray()
               res.send(services)
               console.log(services)
          })

          app.get('/allservices', async(req, res)=>{
               const query = {}
               const cursor = servicesCollection.find(query)
               const services = await cursor.toArray()
               res.send(services)
               console.log(services)
          })

          app.post('/allservices', async(req, res)=>{
               const services = req.body;
               const result = await servicesCollection.insertOne(services)
               res.send(result)
          })

     }
     finally{

     }
}
run().catch(err => console.log(err))


app.get('/', (req, res)=>{
     res.send('server runing')
})

app.listen(port, ()=>{
     console.log(`runing on ${port}`)
})