
"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Button from "@/components/Button";
import TaskInput from "@/components/TaskInput";
import TaskList from "@/components/TaskList";
import { useTasks } from "@/hooks/useTasks";
import { useTaskStats } from "@/hooks/useTaskStats";
import { useTaskFilters } from "@/hooks/useTaskFilters";

export default function Home() {
  const [filter, setFilter] = useState<
    "all" | "active" | "completed"
  >("all");

  const [search, setSearch] = useState("");

  const [sortOrder, setSortOrder] =
    useState<"newest" | "oldest">("newest");

    const {
      tasks,
      addTask,
      deleteTask,
      toggleTask,
      editTask,
    } = useTasks();
    
    const {
      totalTasks,
      completedTasks,
      remainingTasks,
    } = useTaskStats(tasks);
    
    const sortedTasks = useTaskFilters(
      tasks,
      filter,
      search,
      sortOrder
    );

 

  return (
<main className="max-w-2xl mx-auto px-4 py-6 sm:px-6">      <Navbar />

      <Hero />

      <TaskInput onAddTask={addTask} />

      {/* Statistics */}
      <div className="flex justify-between mb-4 font-semibold">
        <p>Tasks: {totalTasks}</p>
        <p>Completed: {completedTasks}</p>
        <p>Remaining: {remainingTasks}</p>
      </div>

      {/* Search / Filter / Sort */}
      <div className="flex flex-col gap-4 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          className="border rounded-lg px-4 py-2 w-full"
        />

        {/* Filter */}
        <div className="flex flex-wrap gap-2">          <button
  onClick={() => setFilter("all")}
  className={`px-4 py-2 rounded transition ${
    filter === "all"
      ? "bg-blue-600 text-white"
      : "border hover:bg-gray-100"
  }`}
>
  All
</button>

<button
  onClick={() => setFilter("active")}
  className={`px-4 py-2 rounded transition ${
    filter === "active"
      ? "bg-blue-600 text-white"
      : "border hover:bg-gray-100"
  }`}
>
  Active
</button>

<button
  onClick={() => setFilter("completed")}
  className={`px-4 py-2 rounded transition ${
    filter === "completed"
      ? "bg-blue-600 text-white"
      : "border hover:bg-gray-100"
  }`}
>
  Completed
</button>
        </div>

        {/* Sort */}
        <select
          value={sortOrder}
          onChange={(event) =>
            setSortOrder(
              event.target.value as "newest" | "oldest"
            )
          }
className="border rounded-lg px-4 py-2 w-full sm:w-auto bg-gray-900 text-white"        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {/* Task List */}
      <TaskList
  tasks={sortedTasks}
  onDeleteTask={deleteTask}
  onToggleTask={toggleTask}
  onEditTask={editTask}
  hasSearch={search.trim().length > 0}
/>

      <div className="flex justify-center mt-8">
        <Button text="Get Started" />
      </div>
    </main>
  );
}
