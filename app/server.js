const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");


const app = express();

const userRoute = require('./routes/User');

app.use('/user', userRoute);

// Démarrage du serveur
app.listen(8080, () => {
    console.log('Server running on port 8080');
});