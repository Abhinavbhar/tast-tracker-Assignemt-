import React, { useState, useEffect } from 'react';
import {
  Container,
  Form,
  FilterBar,
  TaskItem
} from '../StyleComponents/DashboardStyles.js';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    const storedTasks = (localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);


  const addTask =async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newTask = {
      id: Date.now(),
      title,
      description,
      createdAt: new Date().toLocaleString(),
    };
      const updatedTasks = [newTask, ...tasks];
  setTasks(updatedTasks);
  
  
    localStorage.setItem('tasks',JSON.stringify(updatedTasks))
    setTitle('');
    setDescription('');
  };

const deleteTask = (id) => {
  if (window.confirm('Are you sure you want to delete this task?')) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
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

  const saveEdit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setTasks(
      tasks.map((task) =>
        task.id === editingTaskId ? { ...task, title, description } : task
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
    <Container>
      <h1>Task Dashboard</h1>

      <Form onSubmit={editingTaskId ? saveEdit : addTask}>
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
        {editingTaskId && (
          <button type="button" onClick={cancelEdit}>
            Cancel
          </button>
        )}
      </Form>

      <FilterBar>
        <button onClick={() => setFilter('all')}>All ({countByStatus('all')})</button>
        <button onClick={() => setFilter('completed')}>
          Completed ({countByStatus('completed')})
        </button>
        <button onClick={() => setFilter('pending')}>
          Pending ({countByStatus('pending')})
        </button>
      </FilterBar>

      {filteredTasks.map((task) => (
        <TaskItem key={task.id} completed={task.completed}>
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
        </TaskItem>
      ))}
    </Container>
  );
}

export default Dashboard;
