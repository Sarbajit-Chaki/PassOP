// console.log(process.env) // remove this after you've confirmed it is working
import express from 'express'
import 'dotenv/config'
import { MongoClient } from 'mongodb'
import bodyParser from 'body-parser'
import cors from 'cors'


const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(cors())


// Connection URL
const client = new MongoClient(process.env.MONGO_URI);
// Use connect method to connect to the server
await client.connect();
// Create Database 
const db = client.db('passop');


// Get all the passwords
app.get('/', async(req, res) => {
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

// Save the passwords
app.post('/', async(req, res) => {
    const password = req.body
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success: true, result: findResult})
}) 

// Delete the passwords
app.delete('/', async(req, res) => {
    const password = req.body
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({success: true, result: findResult})
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})