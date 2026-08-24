"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
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
    <main className="min-h-screen bg-[#111827] text-slate-200">
      <div className="max-w-2xl mx-auto px-4 py-6 sm:px-6">
        <Navbar />

        <div className="space-y-6">
          <Hero />

          <TaskInput onAddTask={addTask} />

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-slate-800 border border-slate-700 p-4 text-center shadow-sm">
              <p className="text-sm font-medium text-slate-400">
                Tasks
              </p>

              <p className="text-xl font-semibold text-slate-300 mt-1">
                {totalTasks}
              </p>
            </div>

            <div className="rounded-xl bg-slate-800 border border-slate-700 p-4 text-center shadow-sm">
              <p className="text-sm font-medium text-slate-400">
                Completed
              </p>

              <p className="text-xl font-semibold text-slate-300 mt-1">
                {completedTasks}
              </p>
            </div>

            <div className="rounded-xl bg-slate-800 border border-slate-700 p-4 text-center shadow-sm">
              <p className="text-sm font-medium text-slate-400">
                Remaining
              </p>

              <p className="text-xl font-semibold text-slate-300 mt-1">
                {remainingTasks}
              </p>
            </div>
          </div>

          {/* Search / Filter / Sort */}
          <div className="rounded-xl bg-slate-800 border border-slate-700 p-4 shadow-sm space-y-4">
            {/* Search */}
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2.5 text-slate-200 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {/* Filter */}
              <div className="flex flex-wrap gap-2">
                {(["all", "active", "completed"] as const).map(
                  (option) => (
                    <button
                      key={option}
                      onClick={() => setFilter(option)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                        filter === option
                          ? "bg-blue-600 text-white"
                          : "border border-slate-600 bg-slate-700 text-slate-300 hover:bg-slate-600"
                      }`}
                    >
                      {option === "all"
                        ? "All"
                        : option === "active"
                        ? "Active"
                        : "Completed"}
                    </button>
                  )
                )}
              </div>

              {/* Sort */}
              <select
                value={sortOrder}
                onChange={(event) =>
                  setSortOrder(
                    event.target.value as "newest" | "oldest"
                  )
                }
                className="w-full sm:w-auto rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-slate-200 outline-none focus:border-blue-500"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>

          {/* Task List */}
          <TaskList
            tasks={sortedTasks}
            onDeleteTask={deleteTask}
            onToggleTask={toggleTask}
            onEditTask={editTask}
            hasSearch={search.trim().length > 0}
          />
        </div>
      </div>
    </main>
  );
}