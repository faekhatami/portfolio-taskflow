type Task = {
  id: number;
  title: string;
  completed: boolean;
};
type TaskListProps = {
  tasks: Task[];
  onDeleteTask: (id: number) => void;
  onToggleTask: (id: number) => void;
};
  
export default function TaskList({
  tasks,
  onDeleteTask,
  onToggleTask,
}: TaskListProps) {    return (
      <div className="mt-8">
        {tasks.map((task, index) => (
 <div
 key={task.id}
 className="flex items-center justify-between border p-3 rounded-lg mb-2"
>
 <div className="flex items-center gap-3">

   <input
     type="checkbox"
     checked={task.completed}
     onChange={() => onToggleTask(task.id)}
   />

   <p
     className={
       task.completed
         ? "line-through text-gray-400"
         : ""
     }
   >
     {task.title}
   </p>

 </div>

 <button
   onClick={() => onDeleteTask(task.id)}
   className="bg-red-500 text-white px-3 py-1 rounded"
 >
   Delete
 </button>
</div>      ))}
      </div>
    );
  }