const connectToMongo = require("./db");
const express = require("express");

connectToMongo();

const app = express();

app.get('/', (req, res) => {
    res.send("Hello World");
    // res.end();
})

app.listen(3030, ()=> {
    console.log(`Yes I am listening `)
})


/*
let express = require("express");
let app = express();
let mongo = require("mongoose");
let manager = app.listen(3000, () => {
  console.log("Running");
});

mongo
  .connect(
    "mongodb+srv://singhjassi693:Jassi52774@jassiBdclustor.kug0clz.mongodb.net/test",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });
 */