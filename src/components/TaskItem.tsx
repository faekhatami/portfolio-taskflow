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
    <div className="flex justify-between items-center border rounded-lg p-4 mb-3 shadow-sm hover:shadow-md transition-all bg-white">

      <div className="flex items-center gap-3">

        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleTask(task.id)}
        />

        {isEditing ? (
          <input
            value={editTitle}
            onChange={(event) => setEditTitle(event.target.value)}
            className="border rounded px-2 py-1"
          />
        ) : (
          <p
            className={
              task.completed
                ? "line-through text-gray-400"
                : ""
            }
          >
            {task.title}
          </p>
        )}

      </div>

      <div className="flex gap-2">

        {isEditing ? (
          <>
            <button
              onClick={() => {
                if (editTitle.trim()) {
                  onEditTask(task.id, editTitle.trim());
                  setIsEditing(false);
                }
              }}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Save
            </button>

            <button
              onClick={() => {
                setEditTitle(task.title);
                setIsEditing(false);
              }}
              className="bg-gray-400 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>

            <button
              onClick={() => onDeleteTask(task.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </>
        )}

      </div>

    </div>
  );
}