import express from "express";
import jwt from "jsonwebtoken";
import fs from "node:fs";
import { privateK } from "../auth/privateKey.mjs";
import { checkToken } from "../utils/checkToken.mjs";
import { generateSalt } from "../utils/generateSalt.mjs";

import sha256 from 'crypto-js/sha256.js'

// Import du module jwt

const router = express.Router();

export const get = async (req, res, next) => {
  const usernameQuery = req.params.name;
  const tokenInfos = await checkToken(req.headers.authorization);

  console.log(tokenInfos);

  res.status(200).json({
    message: "Voici vos informations :",
    user: tokenInfos,
  });
};

export const post = async (req, res) => {
  const query =
    "INSERT INTO t_users (name, email, password, salt, isAdmin) VALUES (?,?,?,?,?)";

  const salt = generateSalt(10);

  let gfg = "GeeksforGeeks";
  console.log(sha256(gfg).toString());

  try {

    const hashpassword = sha256(salt + req.body.password).toString();
    const [rows] = await req.dbConnection.execute(query, [
      req.body.name,
      req.body.email,
      hashpassword,
      salt,
      0,
    ]);

    res.status(200).json({
      message: "Utilisateur créé !",
    });
  } catch (err) {
    res.status(401).json({
      error: err.message,
    });
  }
};

