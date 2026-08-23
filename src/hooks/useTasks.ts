"use client";

import { useEffect, useState } from "react";
import type { Task } from "@/types/task";

const API_URL = "http://127.0.0.1:8000";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/tasks`)
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  const addTask = async (title: string) => {
    await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    const response = await fetch(`${API_URL}/tasks`);
    const data = await response.json();

    setTasks(data);
  };

  const deleteTask = async (id: number) => {
    await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
    });

    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    );
  };

  const toggleTask = async (id: number) => {
    await fetch(`${API_URL}/tasks/${id}`, {
      method: "PATCH",
    });

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const editTask = async (id: number, title: string) => {
    await fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, title } : task
      )
    );
  };

  return {
    tasks,
    addTask,
    deleteTask,
    toggleTask,
    editTask,
  };
}