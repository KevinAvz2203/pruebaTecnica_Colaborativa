import express from "express";
import { getUsers, createUser } from "../controllers/users.controller.js";

const router = express.Router();

router.route("/").get(getUsers).post(createUser);

export default router;
