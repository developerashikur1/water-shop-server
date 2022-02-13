const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient } = require('mongodb');
const cors = require("cors");
const { get } = require('express/lib/response');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()

// MiddleWare
app.use(cors());
app.use(express.json());


// connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jbkru.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


// all data CRUD operation
async function run (){
try{
    await client.connect();
    const database = client.db('watch-shop');
    const allWatchCollection = database.collection('watchAll');


    // get all watch
    app.get('/watchAll', async(req, res)=>{
        const result = await allWatchCollection.find({}).toArray();
        res.json(result);

    })
}
finally {
    // await client.close();
}
}
run().catch(console.dir);





// connected
app.get('/', (req, res)=>{
    res.send('crud server is running')
});



app.listen(port, ()=>{
    console.log('port is on now')
})