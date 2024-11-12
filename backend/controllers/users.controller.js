import User from "../models/user.model.js";
import mongoose from "mongoose";

/* Returns all existing users from the DB */
export async function getUsers(req, res) {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log("Error while fetching users: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

/* Returns creates and saves new User into the DB */
export async function createUser(req, res) {
  const user = req.body;

  if (!user.username) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newUser = new User(user);

  try {
    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.log("Error while creating the user:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}
