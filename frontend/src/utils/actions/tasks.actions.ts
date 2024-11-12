import axiosInstance from "@/utils/axiosInstance";
import { Task } from "@/interfaces/task.interface";

export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response = await axiosInstance.get<{
      success: boolean;
      data: Task[];
    }>("/tasks");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

// utils/actions/tasks.actions.ts

export const updateTaskState = async (taskId: string, newState: string, taskDetails: { title: string, description: string, assigned_user: string }) => {
    try {
      const response = await fetch(`/api/task/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: taskDetails.title,  // Mantén el título actual
          description: taskDetails.description,  // Mantén la descripción actual
          state: newState,  // Cambia el estado
          assigned_user: taskDetails.assigned_user,  // Mantén el usuario asignado
        }),
      });
      if (!response.ok) {
        throw new Error("Error updating task state");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  