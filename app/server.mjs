// ETML
// Auteur : bulle SecDevOps
// Date : 26.03.2024
// Description : point d'entrée pour démarrer le serveur node.js de l'exercice
//               "Authentification"
//
//

// Librairies et ressources

import express from "express";
import userRoute from "./routes/User.mjs";
import authRoute from "./routes/Auth.mjs";
import { generateSalt } from './utils/generateSalt.mjs';
import cookieParser from "cookie-parser";
import cors from 'cors';
import fs from 'fs';
import http from 'http';
import https from 'https';


const app = express();

// Middleware pour la lecture des réponses formatées en json
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'https://localhost',
    credentials: true,
    exposedHeaders: 'Authorization'
}));

// Les routes
app.use('/user', userRoute);
app.use('/auth', authRoute);

let privateKey = fs.readFileSync('privateKey.key', 'utf8');
let certificate = fs.readFileSync('certificate.crt', 'utf8'); 

// Démarrage du serveur
// app.listen(8080, () => {
//     console.log('Séquence authentification, server running on port 8080');
// });

http.createServer(app).listen(8080, () => {
    console.log('Séquence authentification, server running on port http://localhost:8080');
});

https.createServer({
    key: privateKey,
    cert: certificate
}, app).listen(8443, () => {
    console.log('Séquence authentification, server running on port https://localhost:8443');
})