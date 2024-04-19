import express from "express";
import jwt from "jsonwebtoken";
import fs from "node:fs";

import { privateK } from "../auth/privateKey.mjs";
import { connectToDatabase, connectToDatabaseMiddleware } from "../utils/dbUtils.mjs";



const router = express.Router();

////////////////////////////////////////////////// LOGIN //////////////////////////////////////////////////
router.post("/", connectToDatabaseMiddleware, async (req, res) => {
  const { email, password } = req.body;

  const queryString =
    "SELECT * FROM t_users WHERE email = ? AND password = ?";

  try {
    const [rows] = await req.dbConnection.execute(queryString, [
      email,
      password,
    ]);

    console.log(rows);

    if (rows.length > 0) {
      // signer et renvoyer votre token ici (utiliser un code http de succès)
      const payLoad = {
        id: rows[0].id,
        name: rows[0].name,
        role: rows[0].isAdmin,
        email: rows[0].email,
      };

      const token = generateTokenHS256(privateK, payLoad);

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


export default router;
