const express = require('express');
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;


// medill wares

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kbyx5ha.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
     try {
          const servicesCollection = client.db('bongorent').collection('services')
          const commentsCollection = client.db('bongorent').collection('comment')

           // get data from database
          app.get('/services', async (req, res) => {
               const query = {}
               const cursor = servicesCollection.find(query)
               const services = await cursor.limit(3).toArray()
               res.send(services)
               
          })

          app.get('/allservices', async (req, res) => {
               const query = {}
               const cursor = servicesCollection.find(query)
               const services = await cursor.toArray()
               res.send(services)
               
          })

          app.get('/servicesdetails/:id', async (req, res) => {
               const id = req.params.id;
               const query = { _id: ObjectId(id) };
               const result = await servicesCollection.findOne(query);
               res.send(result)
               
          })

          // send data to database
          app.post('/allservices', async (req, res) => {
               const services = req.body;
               const result = await servicesCollection.insertOne(services)
               res.send(result)
          })

     // get data from database
          app.get('/comments', async(req, res)=>{
               const query = {};
               const cursor = commentsCollection.find(query);
               const comment = await cursor.toArray();
               res.send(comment)
          })

          // send data to database
          app.post('/comments', async(req, res)=>{
               const comment = req.body;
               const result = await commentsCollection.insertOne(comment)
               res.send(result)
          })
     }
     finally {

     }
}
run().catch(err => console.log(err))


app.get('/', (req, res) => {
     res.send('server runing')
})

app.listen(port, () => {
     console.log(`runing on ${port}`)
})