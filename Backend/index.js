const connectToMongo = require("./db");
const express = require("express");
const cors = require('cors')

connectToMongo();

const app = express();
app.use(express.json())
app.use(cors())

// Available Routes

app.use('/api/auth', require("./routes/auth"))
app.use('/api/notes', require("./routes/notes"))

/* 
app.get('/', (req, res) => {
    res.send("Hello World");
    // res.end();
})
 */
 
app.listen(5000, ()=> {
    console.log(`iNotebook Backend - Yes I am listening `)
})
