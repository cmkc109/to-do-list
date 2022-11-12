import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [taskName, setTaskName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(taskName);
    setTaskName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <button>+</button>
      <input
        type="text"
        value={taskName}
        style={{color: "black"}}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Enter your new task..."
      />
    </form>
  );
}
