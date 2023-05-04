const mongoose = require('mongoose');


const mongoURI = 'mongodb+srv://singhjassi693:Jassi52774@jassibdcluster.nsocz5o.mongodb.net/inotebook' 

const connectToMongo = () => {
    mongoose.connect(mongoURI, (console.log("Connected to mongo successfully")) )
} 

module.exports = connectToMongo