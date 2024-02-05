const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const cors = require('cors')
const corsOptions={  
      origin:'*',
      credentials:true,
      optionSuccessStatus:200,
}

const app = express();

app.use(express.json())
let database;
const PORT = 5000;

// MongoDB connection URI
const mongoURI = 'mongodb+srv://harish:1234567890@cluster0.oxfnqye.mongodb.net/?retryWrites=true&w=majority';


app.use(cors())

// Root route
app.get('/', (req, res) => {
    res.send('Hello, this is the root route!');
  });

  app.get('/getdata', async (req, res) => {
    try {
        // Make sure the database variable is initialized before using it
        if (!database) {
            throw new Error("Database not connected");
        }
        // Assuming 'users' is the correct collection name
        const usersCollection = database.collection('document');
        
        // Fetch all documents from the 'users' collection
        const result = await usersCollection.find({}).toArray();
        res.send(result);
    } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Start the server
app.listen(PORT, async () => {
    try {
        const client = await MongoClient.connect(mongoURI);
        database = client.db('sample');
        console.log("Connection successful");

        // Your other server setup code here

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
});