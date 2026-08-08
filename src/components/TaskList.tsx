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