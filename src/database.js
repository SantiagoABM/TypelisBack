const mongoose = require("mongoose");
const MONGODB_URI = require("./config");

mongoose.connect("mongodb://127.0.0.1:27017/typelis")
    .then(db => console.log('Db is conected'))
    .catch(error => console.log('Db is disconected'))