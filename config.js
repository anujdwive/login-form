const mongoose = require("mongoose");

const connect = mongoose.connect("mongodb://127.0.0.1:27017/anujDB");

connect.then(() => {
    console.log("Database connected succesfuly");
})
.catch(() => {
    console.log("Database cannot be connected");
});

const anujDBSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

const collection = new mongoose.model("Usera", anujDBSchema);

module.exports = collection;