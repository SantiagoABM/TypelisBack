const mongoose = require("mongoose");
const MONGODB_URI = require("./config");

mongoose.connect(MONGODB_URI)
    .then(db => console.log('Db is conected'))
    .catch(error => console.log('Db is disconected'))