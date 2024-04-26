import express from "express";
import jwt from "jsonwebtoken";
import fs from "node:fs";
import { privateK } from "../auth/privateKey.mjs";

export const checkToken = async (res, tokenGivedByUser) => {
  const authorizationHeaders = tokenGivedByUser;

  // Checking if the header exists
  if (!authorizationHeaders) {
    const message = `Unvalid token or token not provided`;
    res.status(401).json({ message });
  } else {
    // Extracting the token
    const token = authorizationHeaders.split(" ")[1];

    // Verifying the token
    try {
      jwt.verify(token, privateK);

      const decodedToken = jwt.decode(token);

      return decodedToken;
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
};
