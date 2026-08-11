
import type { Task } from "@/types/task";
import TaskItem from "@/components/TaskItem";

type TaskListProps = {
  tasks: Task[];
  onDeleteTask: (id: number) => void;
  onToggleTask: (id: number) => void;
  onEditTask: (id: number, newTitle: string) => void;
};

export default function TaskList({
  tasks,
  onDeleteTask,
  onToggleTask,
  onEditTask,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-lg font-medium">
          No tasks found
        </p>

        <p className="text-sm mt-2">
          Add a task to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDeleteTask={onDeleteTask}
          onToggleTask={onToggleTask}
          onEditTask={onEditTask}
        />
      ))}
    </div>
  );
}

