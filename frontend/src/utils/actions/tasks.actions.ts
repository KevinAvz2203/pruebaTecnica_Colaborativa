import axiosInstance from "@/utils/axiosInstance";
import { Task } from "@/interfaces/task.interface";

// Función para obtener las tareas
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

// Función para actualizar el estado de una tarea
export const updateTaskState = async (
  taskId: string,
  newState: string,
  taskDetails: { title: string; description: string; assigned_user: string }
): Promise<Task | undefined> => {
  try {
    const response = await axiosInstance.put<{ success: boolean; data: Task }>(
      `/tasks/${taskId}`,
      {
        title: taskDetails.title, // Mantén el título actual
        description: taskDetails.description, // Mantén la descripción actual
        state: newState, // Cambia el estado
        assigned_user: taskDetails.assigned_user, // Mantén el usuario asignado
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error updating task state:", error);
    throw error;
  }
};
