import express from "express";
import { get, post, getAllUsers } from "../controllers/UserController.mjs";
import { connectToDatabaseMiddleware } from "../utils/dbUtils.mjs";

const router = express.Router();
router.get('/:name', connectToDatabaseMiddleware, get);
router.post('/', connectToDatabaseMiddleware, post);
router.get('/', connectToDatabaseMiddleware, getAllUsers);


export default router;