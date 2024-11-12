"use client";
import React, { useState } from "react";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("Pending");
  const [assignedUser, setAssignedUser] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const taskData = { title, description, state, assigned_user: assignedUser };

    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });
      if (!response.ok) throw new Error("Failed to create task");
      // Optionally reset form fields here
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Create a New Task
      </h2>

      <div className="mb-5">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Task Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter task title"
          required
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Task Description
        </label>
        <textarea
          name="description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter task description"
          required
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="state"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Task State
        </label>
        <select
          name="state"
          id="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="mb-5">
        <label
          htmlFor="assignedUser"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Assigned User ID
        </label>
        <input
          type="text"
          name="assignedUser"
          id="assignedUser"
          value={assignedUser}
          onChange={(e) => setAssignedUser(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter assigned user ID"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Submit
      </button>
    </form>
  );
};

export default CreateTask;
