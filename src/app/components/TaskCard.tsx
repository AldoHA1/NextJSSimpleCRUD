"use client";

import { Tasks } from "../types";
import { useRouter } from "next/navigation";

interface Props {
  task: Tasks;
}
export default function TaskCard({ task }: Props): JSX.Element {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/tasks/edit/${task.id}`)}
      className="bg-slate-900 p-3 hover:bg-slate-800 hover:cursor-pointer"
    >
      <h3 className="font-bold text-2xl mb-2">{task.title}</h3>
      <p>{task.description}</p>
      <p>{new Date(task.created_at).toLocaleDateString()}</p>
    </div>
  );
}
