"use client";

import { useEffect, useState } from "react";
import type { Task } from "@/types/task";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };

    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const editTask = (id: number, newTitle: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, title: newTitle }
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

  return {
    tasks,
    addTask,
    deleteTask,
    toggleTask,
    editTask,
  };
}