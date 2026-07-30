"use client";

import { useState } from "react";

type TaskInputProps = {
    onAddTask: (task: string) => void;
  };

export default function TaskInput({ onAddTask }: TaskInputProps) {
  const [task, setTask] = useState("");


  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <input
        className="border p-3 rounded-lg"
        placeholder="Add a new task"
        value={task}
        onChange={(event) => setTask(event.target.value)}
      />

      <p>{task}</p>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
  onClick={() => {
    onAddTask(task);
    setTask("");
  }}
>
  Add Task
</button>
    </div>
  );
}