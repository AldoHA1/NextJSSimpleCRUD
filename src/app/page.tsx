import TaskCard from "@/app/components/TaskCard";
import { Tasks } from "./types";

async function loadTasks(): Promise<Tasks[]> {
  const result = await fetch("http://localhost:3000/api/tasks");
  const data = await result.json();
  return data;
}
export default async function Home(): Promise<JSX.Element> {
  const tasks: Tasks[] = await loadTasks();

  return (
    <section className="container mx-auto">
      <div className="grid grid-cols-3 gap-3 mt-10">
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <p>No Tasks</p>
        )}
      </div>
    </section>
  );
}
