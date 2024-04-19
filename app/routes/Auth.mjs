import express from "express";
import jwt from "jsonwebtoken";

// import { privateK } from "../auth/privateKey.mjs";

import fs from "node:fs";

// Il manque l'import du module jwt

import { connectToDatabase } from "../utils/dbUtils.mjs";

const router = express.Router();

// Middleware pour la connexion à la base de données
const connectToDatabaseMiddleware = async (req, res, next) => {
  try {
    req.dbConnection = await connectToDatabase();
    next();
  } catch (error) {
    console.error("Error connecting to the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

router.post("/", connectToDatabaseMiddleware, async (req, res) => {
  const { username, password } = req.body;

  const queryString =
    "SELECT * FROM t_users WHERE useName = ? AND usePassword = ?";

  try {
    const [rows] = await req.dbConnection.execute(queryString, [
      username,
      password,
    ]);
    if (rows.length > 0) {
      // signer et renvoyer votre token ici (utiliser un code http de succès)
      const payLoad = {
        name: "John Doe",
        foo: "bar",
      };

      let privateK;

      privateK = fs.readFileSync("auth/privkey.pem", "utf-8");

      console.log(privateK);

      const token = generateTokenHS256(privateK, payLoad);
      // const token = generateTokenHS512(privateK, payLoad)

      res.status(200).json({ token: token });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

function generateTokenHS256(privateKey, payLoad) {
  const token = jwt.sign(
    payLoad,
    privateKey,
    { expiresIn: "1h" },
    { algorithm: "HS256" }
  );

  console.log("TOKEN : " + token);
  return token;
}

function generateTokenHS512(privateKey, payLoad) {
  const token = jwt.sign(
    payLoad,
    privateKey,
    { expiresIn: "2h" },
    { algorithm: "HS512" }
  );

  console.log("TOKEN : " + token);
  return token;
}

export default router;
