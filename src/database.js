const mongoose = require("mongoose");
const MONGODB_URI = "mongodb://localhost/typelis";
//const MONGODB_URI = `mongodb+srv://Tiago:tysonryx123@projects.dkslbjj.mongodb.net/typelis?retryWrites=true&w=majority`
mongoose.connect(MONGODB_URI)
    .then(db => console.log('Db is conected'))
    .catch(error => console.log('Db is disconected'))