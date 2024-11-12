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
