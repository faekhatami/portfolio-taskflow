type TaskListProps = {
    tasks: string[];
  };
  
  export default function TaskList({ tasks }: TaskListProps) {
    return (
      <div className="mt-8">
        {tasks.map((task, index) => (
          <p key={index}>{task}</p>
        ))}
      </div>
    );
  }