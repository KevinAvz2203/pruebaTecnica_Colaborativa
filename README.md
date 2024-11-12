
# Sistema de Gestión de Tareas Colaborativas

El objetivo de este ejercicio es desarrollar un sistema simple de gestión de tareas colaborativas para un equipo de trabajo. Permitiendo a los usuarios:

1. Crear, editar y eliminar tareas.
2. Asignar tareas a distintos usuarios.
3. Cambiar el estado de una tarea entre: Pendiente, En Proceso, o Completada.
4. Listar todas las tareas filtrando por estado o por usuario asignado


## Installation

Install dependencies with npm

```bash
  In the route folder:
  npm run build
```
Run Project

```bash
  In the route folder:
  npm run start
```
## Referencia del API

#### Get all Task

```http
  GET /api/task
```

#### Get single Task

```http
  GET /api/task/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Requerido**. Task ID to fetch |

#### Create a new Task

```http
  POST /api/task/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Requerido**.|
| `description`      | `string` | **Requerido**.|
| `state`      | `string` | **Requerido**. "Pending", "In Progress", "Completed"|
| `assigned_user`      | `string` | **Requerido**. user ID to be assigned to this task|

#### Update Task

```http
  PUT /api/task/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Requerido**. If there is no change, it keeps the previous vlaue|
| `description`      | `string` | **Requerido**. If there is no change, it keeps the previous vlaue|
| `state`      | `string` | **Requerido**. "Pending", "In Progress", "Completed"|
| `assigned_user`      | `string` | **Requerido**. If there is no change, it keeps the previous vlaue| 

#### Delete Task

```http
  GET /api/task/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Requerido**. Task ID to delete |
