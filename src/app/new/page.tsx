"use client";

import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

interface TaskFormEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement & {
    title: HTMLInputElement;
    description: HTMLTextAreaElement;
  };
}
export default function NewTask(): JSX.Element {
  const router = useRouter();
  const params = useParams<{ id: string | undefined }>();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    if (params.id) {
      fetch(`/api/tasks/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setTitle(data.title);
          setDescription(data.description);
        });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (e: TaskFormEvent) => {
    e.preventDefault();

    if (params.id) {
      const result = await fetch(`/api/tasks/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({ title, description }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await result.json();
      alert("Tarea actualizada " + data.title);
    } else {
      const result = await fetch(`/api/tasks`, {
        method: "POST",
        body: JSON.stringify({ title, description }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await result.json();
      alert("Nueva Tarea Creada: " + data.title);
    }
    router.refresh();
    router.push("/");
  };

  const handleDelete = () => {
    fetch(`/api/tasks/${params.id}`, {
      method: "DELETE",
    });
    router.refresh();
    router.push("/");
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        action="POST"
        className="bg-slate-800 p-10 lg:w-1/4 md:w-1/2"
      >
        <label htmlFor="title" className="font-bold text-sm">
          Title
        </label>
        <input
          placeholder="Titulo de la tarea"
          type="text"
          name="title"
          id="title"
          className="border-gray-400 p-2 mb-4 w-full text-black"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          value={title}
        />
        <label htmlFor="description" className="font-bold text-sm">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          rows={3}
          placeholder="Describe tu tarea"
          className="border-gray-400 p-2 mb-4 w-full text-black"
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            setDescription(e.target.value);
          }}
          value={description}
        />
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {params.id ? "Editar" : "Crear"}
          </button>

          {params.id && (
            <button
              onClick={() => handleDelete()}
              type="button"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Eliminar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
