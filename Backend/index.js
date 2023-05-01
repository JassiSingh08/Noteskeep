const connectToMongo = require("./db");
const express = require("express");

connectToMongo();

const app = express();
app.use(express.json())

// Available Routes

app.use('/api/auth', require("./routes/auth"))
app.use('/api/notes', require("./routes/notes"))

/* 
app.get('/', (req, res) => {
    res.send("Hello World");
    // res.end();
})
 */
 
app.listen(3030, ()=> {
    console.log(`Yes I am listening `)
})
