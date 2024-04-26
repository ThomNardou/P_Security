import express from "express";
import { get, post } from "../controllers/UserController.mjs";
import { connectToDatabaseMiddleware } from "../utils/dbUtils.mjs";

const router = express.Router();
router.get('/:name', connectToDatabaseMiddleware, get);
router.post('/', connectToDatabaseMiddleware, post)


export default router;