import type { Task } from "@/types/task";

export function useTaskStats(tasks: Task[]) {
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const remainingTasks = totalTasks - completedTasks;

  return {
    totalTasks,
    completedTasks,
    remainingTasks,
  };
}