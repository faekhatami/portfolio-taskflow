"use client";

import type { Task } from "@/types/task";
import { useState } from "react";

type TaskItemProps = {
  task: Task;
  onDeleteTask: (id: number) => void;
  onToggleTask: (id: number) => void;
  onEditTask: (id: number, newTitle: string) => void;
};

export default function TaskItem({
  task,
  onDeleteTask,
  onToggleTask,
  onEditTask,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  return (
    <div className="flex items-center justify-between border border-slate-700 rounded-xl p-4 mb-3 bg-slate-800 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleTask(task.id)}
          className="accent-blue-600"
        />

        {isEditing ? (
          <input
            value={editTitle}
            onChange={(event) =>
              setEditTitle(event.target.value)
            }
            className="border border-slate-600 bg-slate-700 text-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <p
            className={
              task.completed
                ? "line-through text-slate-500"
                : "text-slate-200 font-medium"
            }
          >
            {task.title}
          </p>
        )}
      </div>

      <div className="flex gap-3 ml-2">
        {isEditing ? (
          <>
            <button
              onClick={() => {
                if (editTitle.trim()) {
                  onEditTask(
                    task.id,
                    editTitle.trim()
                  );
                  setIsEditing(false);
                }
              }}
              className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Save
            </button>

            <button
              onClick={() => {
                setEditTitle(task.title);
                setIsEditing(false);
              }}
              className="bg-slate-600 text-slate-200 px-3 py-2 rounded-lg hover:bg-slate-500 transition"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Edit
            </button>

            <button
              onClick={() => {
                const confirmed = window.confirm(
                  "Are you sure you want to delete this task?"
                );

                if (confirmed) {
                  onDeleteTask(task.id);
                }
              }}
              className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}