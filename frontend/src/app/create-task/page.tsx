// components/TaskForm.js
import { useState } from 'react';

const TaskForm = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'Pendiente',
    assignedUser: '',
  });

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      if (response.ok) {
        console.log('Tarea guardada');
      } else {
        console.log('Error al guardar tarea');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div>
        <label htmlFor="title">Título</label>
        <input
          type="text"
          id="title"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          name="description"
          value={task.description}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="status">Estado</label>
        <select
          id="status"
          name="status"
          value={task.status}
          onChange={handleChange}
        >
          <option value="Pendiente">Pendiente</option>
          <option value="En Proceso">En Proceso</option>
          <option value="Completada">Completada</option>
        </select>
      </div>

      <div>
        <label htmlFor="assignedUser">Usuario asignado</label>
        <input
          type="text"
          id="assignedUser"
          name="assignedUser"
          value={task.assignedUser}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Guardar Tarea</button>
    </form>
  );
};

export default TaskForm;
