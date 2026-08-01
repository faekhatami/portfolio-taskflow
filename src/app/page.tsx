"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Button from "@/components/Button";
import TaskInput from "@/components/TaskInput";
import TaskList from "@/components/TaskList";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Home() {

  const [tasks, setTasks] = useState<Task[]>([]);


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


  return (
    <main>
      <Navbar />

      <Hero />

      <TaskInput onAddTask={handleAddTask} />
      
      <TaskList
  tasks={tasks}
  onDeleteTask={handleDeleteTask}
  onToggleTask={handleToggleTask}
/>
      <div className="flex justify-center mt-8">
        <Button text="Get Started" />
      </div>
    </main>
  );
}