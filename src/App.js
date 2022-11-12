import "./App.css";
import TaskForm from "./components/TaskForm";
import Task from "./components/Task";
import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const localData = localStorage.getItem("tasks");
    setTasks( localData ? JSON.parse(localData) : []);
  }, []);

  const addTask = (name) => {
    setTasks([...tasks, {name , done: false}])
  }

  const removeTask = (indexToRemove) => {
    setTasks( (prev) => {
      return prev.filter( (task, i) => i !== indexToRemove)
    })
  }

  const updateTaskDone = (i, newDoneStatus) => {
    setTasks( (prev) => {
      const tasks = [...prev];
      tasks[i].done = newDoneStatus;
      return tasks
    })

  }
  const renameTask = (i, newName) => {
      setTasks( (prev) => {
        const tasks = [...prev];
        tasks[i].name = newName;
        return tasks
      })
  }

  
  //tasks : [ {}, {}, {}]
  const taskCompleted = tasks.filter((taskObj) => taskObj.done).length;
  const totalTasks = tasks.length;


  return (
    <main className="main">
      <h1> To-do List  </h1>
      <h3>{taskCompleted}/{totalTasks} Completed </h3>
      
      <TaskForm onAdd={addTask} />

      {tasks.map((task, i) => (
        <Task
          {...task}
          onRename={(newName) => renameTask(i, newName)}
          onTrash={() => removeTask(i)}
          onToggle={(done) => updateTaskDone(i, done)}
        />
      ))}
    </main>
  );
}

export default App;
