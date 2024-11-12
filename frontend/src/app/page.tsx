"use client"
import { useEffect, useState } from "react";
import { fetchTasks } from "@/utils/actions/tasks.actions";
import { Task } from "@/interfaces/task.interface";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const tasksData = await fetchTasks();
        setTasks(tasksData);
      } catch (error) {
        console.error(error);
      }
    };

    getTasks();
  }, []);

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>State: {task.state}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
