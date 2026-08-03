"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Button from "@/components/Button";
import TaskInput from "@/components/TaskInput";
import TaskList from "@/components/TaskList";
import type { Task } from "@/types/task";

export default function Home() {

  const [tasks, setTasks] = useState<Task[]>([]);

  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const handleAddTask = (newTask: string) => {
    const task = {
      id: Date.now(),
      title: newTask,
      completed: false,
    };
  
    setTasks([...tasks, task]);
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
  
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;
  
  const remainingTasks = totalTasks - completedTasks;

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
  
    if (filter === "completed") return task.completed;
  
    return true;
  });

  return (
<main className="max-w-2xl mx-auto p-6">      <Navbar />

      <Hero />

      <TaskInput onAddTask={handleAddTask} />
      
      <div className="flex justify-between mb-4 font-semibold">
  <p>Tasks: {totalTasks}</p>
  <p>Completed: {completedTasks}</p>
  <p>Remaining: {remainingTasks}</p>
</div>

<div className="flex gap-3 mb-4">
  <button className="border px-4 py-2 rounded hover:bg-gray-100 transition" onClick={() => setFilter("all")}>
    All
  </button>

  <button className="border px-4 py-2 rounded hover:bg-gray-100 transition" onClick={() => setFilter("active")}>
    Active
  </button>

  <button className="border px-4 py-2 rounded hover:bg-gray-100 transition" onClick={() => setFilter("completed")}>
    Completed
  </button>
</div>

<TaskList
  tasks={filteredTasks}
  onDeleteTask={handleDeleteTask}
  onToggleTask={handleToggleTask}
/>
      <div className="flex justify-center mt-8">
        <Button text="Get Started" />
      </div>
    </main>
  );
}