import express from "express";
import jwt from "jsonwebtoken";
import fs from "node:fs";
import { privateK } from "../auth/privateKey.mjs";
import { checkToken } from "../utils/checkToken.mjs";
import { generateSalt } from "../utils/generateSalt.mjs";

import sha256 from "crypto-js/sha256.js";

// Import du module jwt

const router = express.Router();

export const get = async (req, res, next) => {

  const usernameQuery = req.params.name;
  const tokenInfos = await checkToken(res, req.cookies.jwt);

  if (tokenInfos.name !== usernameQuery) {
    return res.status(403).json({
      message: "Vous n'avez pas les droits pour accéder à ces informations",
    });
  }

  const query = "SELECT * FROM t_users WHERE name = ? AND id = ? AND email = ?";

  const [rows] = await req.dbConnection.execute(query, [
    tokenInfos.name,
    tokenInfos.id,
    tokenInfos.email,
  ]);

  res.status(200).json({
    message: "Voici vos informations :",
    user: {
      name: usernameQuery,
      email: rows[0].email,
      password: rows[0].password,
    },
  });
};

export const post = async (req, res) => {
  const query =
    "INSERT INTO t_users (name, email, password, salt, isAdmin) VALUES (?,?,?,?,?)";

  const salt = generateSalt(10);

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

export const getAllUsers = async (req, res) => {
  const query = "SELECT id, name, email FROM t_users";

  const tokenInfos = await checkToken(res, req.cookies.jwt);

  if (!tokenInfos.role) {
    return res.status(403).json({
      message: "Vous devez être administrateur pour accéder à ces informations",
    });
  }

  const [rows] = await req.dbConnection.execute(query);

  res.status(200).json({
    users: rows,
  });
}
