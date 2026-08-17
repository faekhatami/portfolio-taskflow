import { useMemo } from "react";
import type { Task } from "@/types/task";

type Filter = "all" | "active" | "completed";
type SortOrder = "newest" | "oldest";

export function useTaskFilters(
  tasks: Task[],
  filter: Filter,
  search: string,
  sortOrder: SortOrder
) {
  return useMemo(() => {
    const filteredTasks = tasks.filter((task) => {
      const matchesFilter =
        filter === "all"
          ? true
          : filter === "active"
          ? !task.completed
          : task.completed;

      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });

    return [...filteredTasks].sort((a, b) => {
      if (sortOrder === "newest") {
        return b.id - a.id;
      }

      return a.id - b.id;
    });
  }, [tasks, filter, search, sortOrder]);
}