const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());


const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String

})

app.get('/login', (req, res) => {


    
})