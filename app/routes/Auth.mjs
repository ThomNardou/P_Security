import express from "express";
import jwt from "jsonwebtoken";
import fs from "node:fs";
import sha256 from "crypto-js/sha256.js";
import cookie from "cookie";

import { privateK } from "../auth/privateKey.mjs";
import {
  connectToDatabase,
  connectToDatabaseMiddleware,
} from "../utils/dbUtils.mjs";

const router = express.Router();

////////////////////////////////////////////////// LOGIN //////////////////////////////////////////////////
router.post("/", connectToDatabaseMiddleware, async (req, res) => {
  const { name, password } = req.body;

  const salt = "SELECT salt FROM t_users WHERE name = ?";
  const [dbSalt] = await req.dbConnection.execute(salt, [name]);
  
  if (dbSalt.length === 0) {
    res.status(401).json({ error: "Invalid name or password" });
    return;
  }

  const hashedPassword = sha256(dbSalt[0].salt + password).toString()

  const queryString = "SELECT * FROM t_users WHERE name = ? AND password = ?";

  ////////////////////////////////////// A NE PAS FAIRE ///////////////////////////////////////
  // const queryString = `SELECT * FROM t_users WHERE name = '${name}' AND password = '${hashedPassword}'`;

  try {
    const [rows] = await req.dbConnection.execute(queryString, [
      name,
      hashedPassword,
    ]);
    // const [rows] = await req.dbConnection.execute(queryString);

    if (rows.length > 0) {
      // signer et renvoyer votre token ici (utiliser un code http de succès)
      const payLoad = {
        id: rows[0].id,
        name: rows[0].name,
        role: rows[0].isAdmin,
        email: rows[0].email,
      }; 

      const token = generateTokenHS256(privateK, payLoad);

      res.cookie("jwt", token, {
        httpOnly: false,
        secure: true,
        sameSite: "strict",
        path: "/",
      });  

      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Expose-Headers", "Cache-Control");

      res.status(200).json({ token: token });
    } else {
      res.status(401).json({ error: "Invalid name or password" });
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
  return token;
}

export default router;
