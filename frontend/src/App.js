import React, { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("http://localhost:15000/tasks");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error('Error loading tasks:', error);
      setError("Cannot load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async () => {
    if (!text.trim()) return;
    
    try {
      setError("");
      const res = await fetch("http://localhost:15000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.trim(), completed: false })
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      setText("");
      loadTasks();
    } catch (error) {
      console.error('Error adding task:', error);
      setError("Cannot add task");
    }
  };

  const toggleTask = async (task) => {
    try {
      setError("");
      const res = await fetch(`http://localhost:15000/tasks/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...task, completed: !task.completed })
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      loadTasks();
    } catch (error) {
      console.error('Error updating task:', error);
      setError("Cannot update task");
    }
  };

  const deleteTask = async (id) => {
    try {
      setError("");
      const res = await fetch(`http://localhost:15000/tasks/${id}`, { 
        method: "DELETE" 
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      loadTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      setError("Cannot delete task");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: '0 auto' }}>
      <h1>✅ To-Do App</h1>
      
      {error && (
        <div style={{ color: 'red', marginBottom: 10 }}>
          {error}
        </div>
      )}
      
      <div style={{ marginBottom: 20 }}>
        <input 
          value={text} 
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add new task..."
          style={{ padding: 8, marginRight: 10, width: 300 }}
        />
        <button 
          onClick={addTask}
          disabled={!text.trim()}
          style={{ padding: 8, cursor: 'pointer' }}
        >
          Add
        </button>
      </div>
      
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tasks.map(task => (
            <li 
              key={task._id} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: 10, 
                borderBottom: '1px solid #eee',
                textDecoration: task.completed ? 'line-through' : 'none',
                opacity: task.completed ? 0.6 : 1
              }}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task)}
                style={{ marginRight: 10 }}
              />
              <span style={{ flex: 1 }}>{task.text}</span>
              <button 
                onClick={() => deleteTask(task._id)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer',
                  color: 'red'
                }}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
