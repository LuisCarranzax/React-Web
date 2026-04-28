import { useState } from 'react';
import toast from 'react-hot-toast';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.trim()) {
      toast.error('Por favor, escribe una tarea.');
      return;
    }
    
    const taskObj = { id: Date.now(), text: newTask, completed: false };
    setTasks([...tasks, taskObj]);
    setNewTask('');
    toast.success('¡Tarea agregada!');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast.success('Tarea eliminada');
  };

  return (
    <div className="card">
      <h2>Lista de Tareas</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          className="input-field"
          placeholder="¿Qué necesitas hacer hoy?"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{ marginBottom: 0 }}
        />
        <button type="submit" className="btn">Añadir</button>
      </form>

      <ul className="list">
        {tasks.length === 0 ? <p style={{ color: '#64748b' }}>No tienes tareas pendientes. ¡Buen trabajo!</p> : null}
        
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <div 
              className={`task-content ${task.completed ? 'completed' : ''}`}
              onClick={() => toggleTask(task.id)}
            >
              <span className="checkbox-custom">{task.completed ? '✅' : '⭕'}</span>
              <span className="task-text">{task.text}</span>
            </div>
            
            <button 
              className="btn-delete" 
              onClick={() => deleteTask(task.id)}
              title="Eliminar tarea"
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}