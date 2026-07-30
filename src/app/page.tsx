"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Button from "@/components/Button";
import TaskInput from "@/components/TaskInput";
import TaskList from "@/components/TaskList";

export default function Home() {

  const handleAddTask = (newTask: string) => {
    setTasks([...tasks, newTask]);
  };

  const [tasks, setTasks] = useState<string[]>([
    "Learn React",
    "Practice TypeScript",
  ]);

  return (
    <main>
      <Navbar />

      <Hero />

      <TaskInput onAddTask={handleAddTask} />
      
<TaskList tasks={tasks} />

      <div className="flex justify-center mt-8">
        <Button text="Get Started" />
      </div>
    </main>
  );
}