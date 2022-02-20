const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connectiong to  MongoDb"));

db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;