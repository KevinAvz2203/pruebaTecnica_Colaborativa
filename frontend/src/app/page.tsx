"use client";

import { useEffect, useState } from "react";
import { fetchTasks, updateTaskState } from "@/utils/actions/tasks.actions"; // Asegúrate de que la función updateTaskState esté implementada
import { Task } from "@/interfaces/task.interface";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [selectedState, setSelectedState] = useState<string>(""); // Para el filtro por estado
  const [selectedUser, setSelectedUser] = useState<string>(""); // Para el filtro por usuario asignado

  useEffect(() => {
    const getTasks = async () => {
      try {
        const tasksData = await fetchTasks();
        setTasks(tasksData);
        setFilteredTasks(tasksData); // Inicializa las tareas filtradas
      } catch (error) {
        console.error(error);
      }
    };

    getTasks();
  }, []);

  const handleStateFilter = (state: string) => {
    setSelectedState(state);
    filterTasks(state, selectedUser);
  };

  const handleUserFilter = (user: string) => {
    setSelectedUser(user);
    filterTasks(selectedState, user);
  };

  const filterTasks = (state: string, user: string) => {
    const filtered = tasks.filter((task) => {
      const matchesState = state ? task.state === state : true;
      const matchesUser = user ? task.assigned_user === user : true;
      return matchesState && matchesUser;
    });
    setFilteredTasks(filtered);
  };

  const handleTaskStateChange = async (taskId: string, newState: string, task: Task) => {
    try {
      // Llama a updateTaskState pasando los detalles de la tarea
      await updateTaskState(taskId, newState, {
        title: task.title,
        description: task.description,
        assigned_user: task.assigned_user,
      });

      // Actualiza las tareas en el estado local
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t._id === taskId ? { ...t, state: newState } : t
        )
      );
      setFilteredTasks((prevTasks) =>
        prevTasks.map((t) =>
          t._id === taskId ? { ...t, state: newState } : t
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-black text-2xl font-bold text-center mb-6">To Do List</h1>

        {/* Filtros */}
        <div className="mb-4 flex gap-4 justify-center text-black">
          <select
            className="p-2 border border-gray-300 rounded"
            value={selectedState}
            onChange={(e) => handleStateFilter(e.target.value)}
          >
            <option value="">Filtrar por Estado</option>
            <option value="Pendiente">Pendiente</option>
            <option value="En Proceso">En Proceso</option>
            <option value="Completada">Completada</option>
          </select>

          <select
            className="p-2 border border-gray-300 rounded"
            value={selectedUser}
            onChange={(e) => handleUserFilter(e.target.value)}
          >
            <option value="">Filtrar por Usuario</option>
            {/* Aquí debes agregar las opciones dinámicas de los usuarios */}
            {tasks.map((task) => (
              <option key={task._id} value={task.assigned_user}>
                {task.assigned_user}
              </option>
            ))}
          </select>
        </div>

        {/* Lista de tareas */}
        <ul className="space-y-4">
          {filteredTasks.map((task) => (
            <li
              key={task._id}
              className="p-4 bg-blue-100 rounded-lg shadow-md hover:bg-blue-200 transition-all"
            >
              <h2 className="text-xl font-semibold text-black">{task.title}</h2>
              <p className="text-gray-700">{task.description}</p>
              <p className="text-gray-600 text-sm mt-2">State: {task.state}</p>

              {/* Botón para cambiar estado */}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleTaskStateChange(task._id, "Pendiente", task)}
                  className="bg-yellow-500 text-white py-1 px-3 rounded"
                >
                  Pendiente
                </button>
                <button
                  onClick={() => handleTaskStateChange(task._id, "En Proceso", task)}
                  className="bg-blue-500 text-white py-1 px-3 rounded"
                >
                  En Proceso
                </button>
                <button
                  onClick={() => handleTaskStateChange(task._id, "Completada", task)}
                  className="bg-green-500 text-white py-1 px-3 rounded"
                >
                  Completada
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
