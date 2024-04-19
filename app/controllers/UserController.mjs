import express from "express";
import jwt from "jsonwebtoken";
import fs from "node:fs";
import { privateK } from "../auth/privateKey.mjs";

// Import du module jwt

const router = express.Router();

export const get = (req, res, next) => {
  const authorizationHeaders = req.headers.authorization;

  // Checking if the header exists
  if (!authorizationHeaders) {
    const message = `Unvalid token or token not provided`;
    res.status(401).json({ message });
  } else {
    // Extracting the token
    const token = authorizationHeaders.split(" ")[1];

    // Verifying the token
    jwt.verify(token, privateK, (error, decodedToken) => {
      if (error) {
        // If the token fails, return 401
        const message = "You are not allowed to access this ressource";
        res.status(401).json({ message });
      }
      // Extracting the user's Id from the decoded token
      const userId = decodedToken.userId;

      return res.status(200).json({ data: decodedToken });
      next();
    });
  }

  // Remplacez cette portion de code par votre traitement du jeton JWT
};

const auth = (req, res, next) => {};

router.get("/", get);

export default router;
