import { useState, useEffect } from "react";
import tasksData from "../Data/Tasks";
import StatusBadge from "../components/StatusBadge";

function Tasks() {

  const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : tasksData;
});
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("Pending");
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === "Completed").length;
  const pendingTasks = tasks.filter(task => task.status === "Pending").length;

  useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);

  function addTask() {
    const newTask = {
      id: tasks.length + 1,
      title: title,
      deadline: deadline,
      status: status
    };

    setTasks([...tasks, newTask]);

    setTitle("");
    setDeadline("");
    setStatus("Pending");
  }

  function deleteTask(id) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }

function toggleStatus(id) {
  const updatedTasks = tasks.map(task =>
    task.id === id
      ? { ...task, status: task.status === "Pending" ? "Completed" : "Pending" }
      : task
  );

  setTasks(updatedTasks);
}

  return (
    <div className="container">

      <h2>Tasks List</h2>

     <h3>Add New Task</h3>

<input
  placeholder="Task Title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
/>

<input
  type="date"
  value={deadline}
  onChange={(e) => setDeadline(e.target.value)}
/>

<select
  value={status}
  onChange={(e) => setStatus(e.target.value)}
>
  <option>Pending</option>
  <option>Completed</option>
</select>

<br /><br />

<button onClick={addTask}>Add Task</button>

<br /><br />
<div className="summary">

<div className="card">
<h4>Total Tasks</h4>
<p>{totalTasks}</p>
</div>

<div className="card">
<h4>Completed</h4>
<p>{completedTasks}</p>
</div>

<div className="card">
<h4>Pending</h4>
<p>{pendingTasks}</p>
</div>

</div>

<table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Title</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
          <td>{task.title}</td>
          <td>{task.deadline}</td>
          <td>
          <StatusBadge status={task.status} />
          </td>
          <td>
  <button onClick={() => toggleStatus(task.id)}>
    Complete
  </button>

  <button onClick={() => deleteTask(task.id)}>
    Delete
  </button>

</td>
       </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default Tasks;