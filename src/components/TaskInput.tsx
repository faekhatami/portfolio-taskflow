
"use client";

import { useState } from "react";

type TaskInputProps = {
  onAddTask: (task: string) => void;
};

export default function TaskInput({
  onAddTask,
}: TaskInputProps) {
  const [task, setTask] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!task.trim()) return;

    onAddTask(task.trim());
    setTask("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8"
    >
<div className="flex flex-col sm:flex-row gap-3">        <input
          type="text"
          placeholder="What do you need to do?"
          value={task}
          onChange={(event) =>
            setTask(event.target.value)
          }
          className="flex-1 bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white font-medium px-5 py-3 rounded-xl hover:bg-blue-700 active:scale-95 transition w-full sm:w-auto"        >
          Add Task
        </button>
      </div>
    </form>
  );
}

