import React, { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newTask = {
      id: Date.now(),
      title,
      description,
      completed: false,
      createdAt: new Date().toLocaleString(),
    };
    setTasks([newTask, ...tasks]);
    setTitle('');
    setDescription('');
  };

  const deleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setTitle(task.title);
    setDescription(task.description);
  };

  const saveEdit = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title, description } : task
      )
    );
    setEditingTaskId(null);
    setTitle('');
    setDescription('');
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setTitle('');
    setDescription('');
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const countByStatus = (status) => {
    if (status === 'completed') return tasks.filter((t) => t.completed).length;
    if (status === 'pending') return tasks.filter((t) => !t.completed).length;
    return tasks.length;
  };

  return (
    <div className="dashboard">
      <h1>Task Dashboard</h1>

      <form onSubmit={editingTaskId ? () => saveEdit(editingTaskId) : addTask} className="task-form">
        <input
          type="text"
          placeholder="Title (required)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">{editingTaskId ? 'Save' : 'Add Task'}</button>
        {editingTaskId && <button onClick={cancelEdit} type="button">Cancel</button>}
      </form>

      <div className="filters">
        <button onClick={() => setFilter('all')}>
          All ({countByStatus('all')})
        </button>
        <button onClick={() => setFilter('completed')}>
          Completed ({countByStatus('completed')})
        </button>
        <button onClick={() => setFilter('pending')}>
          Pending ({countByStatus('pending')})
        </button>
      </div>

      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <div className="task-header">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              <span className="task-title">{task.title}</span>
              <div className="task-actions">
                <button onClick={() => startEditing(task)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            </div>
            {task.description && <p className="task-desc">{task.description}</p>}
            <small className="task-time">{task.createdAt}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
