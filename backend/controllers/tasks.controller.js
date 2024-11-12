import Task from "../models/task.model.js";
import mongoose from "mongoose";

export async function getTasks(req, res) {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    console.log("Error while fetching tasks: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export async function createTask(req, res) {
  const task = req.body;

  if (!task.title || !task.description || !task.state || !task.assigned_user) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newTask = new Task(task);

  try {
    await newTask.save();
    res.status(201).json({ success: true, data: newTask });
  } catch (error) {
    console.log("Error while creating the task:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export async function updateTask(req, res) {
  const { id } = req.params;

  const task = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Task ID" });
  }

  try {
    const updatedTasks = await Task.findByIdAndUpdate(id, task, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedTasks });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export async function deleteTask(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Task ID" });
  }

  try {
    await Task.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Task Deleted" });
  } catch (error) {
    console.log("Error while deleting the task:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}
