import express from "express";
import jwt from "jsonwebtoken";
import fs from "node:fs";
import sha256 from 'crypto-js/sha256.js';

import { privateK } from "../auth/privateKey.mjs";
import { connectToDatabase, connectToDatabaseMiddleware } from "../utils/dbUtils.mjs";

const router = express.Router();

////////////////////////////////////////////////// LOGIN //////////////////////////////////////////////////
router.post("/", connectToDatabaseMiddleware, async (req, res) => {
  const { email, password } = req.body;

  const salt = "SELECT salt FROM t_users WHERE email = ?";
  const [dbSalt] = await req.dbConnection.execute(salt, [email]);
  const hashedPassword = sha256(dbSalt[0].salt + password).toString();  

  const queryString =
    "SELECT * FROM t_users WHERE email = ? AND password = ?";

  try {
    const [rows] = await req.dbConnection.execute(queryString, [
      email,
      hashedPassword,
    ]);

    
    if (rows.length > 0) {
      
      // signer et renvoyer votre token ici (utiliser un code http de succès)
      const payLoad = {
        id: rows[0].id,
        name: rows[0].name,
        role: rows[0].isAdmin,
        email: rows[0].email,
      };

      const token = generateTokenHS256(privateK, payLoad);

      res.cookie("token", token, { httpOnly: false });

      res.status(200).json({ token: token });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
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


export default router;
