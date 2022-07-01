import { Gear, Trash } from "phosphor-react";
import Api from "../services/api";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth";
import md5 from "crypto-js/md5";

export function CardTask({ task, setUpdate }) {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useContext(AuthContext);

  const gravatar = md5(user.email).toString();

  const handleDelete = (task) => {
    Api.delete(`task/${task.id}`).then(() => {
      setUpdate((prev) => prev.filter((t) => t.id !== task.id));
    });
  };

  const uploadTaskPending = (task) => {
    const newTask = {
      id: task.id,
      content: task.content,
      userId: task.userId,
      pending: true,
      inProgress: false,
      ready: false,
    };
    Api.put(`task/${task.id}`, newTask);
    setIsOpen(!isOpen);
    setUpdate((prev) => prev.map((t) => (t.id === task.id ? newTask : t)));
  };

  const uploadTaskInProgress = (task) => {
    const newTask = {
      id: task.id,
      content: task.content,
      userId: task.userId,
      pending: false,
      inProgress: true,
      ready: false,
    };
    Api.put(`/task/${task.id}`, newTask);
    setIsOpen(!isOpen);
    setUpdate((prev) => prev.map((t) => (t.id === task.id ? newTask : t)));
  };

  const uploadTaskReady = (task) => {
    const newTask = {
      id: task.id,
      content: task.content,
      userId: task.userId,
      pending: false,
      inProgress: false,
      ready: true,
    };
    Api.put(`/task/${task.id}`, newTask);
    setIsOpen(!isOpen);
    setUpdate((prev) => prev.map((t) => (t.id === task.id ? newTask : t)));
  };

  return (
    <div className="bg-bgColor-default px-4 py-3 rounded-xl">
      <div className="pb-10 pt-1 px-1">
        <strong className="text-lg italic break-words">{task.content}</strong>
      </div>
      <div className="flex justify-between">
        <div className="text-red-500 italic uppercase">
          <img
            className="h-7 w-7 rounded-full"
            src={`https://www.gravatar.com/avatar/${gravatar}?d=robohash`}
            alt="avatar"
          />
        </div>
        <div className="relative">
          <div className="flex gap-1 mt-2">
            <button onClick={() => setIsOpen(!isOpen)}>
              <Gear size={16} className="text-blue-500" />
            </button>
            <button onClick={() => handleDelete(task)}>
              <Trash size={16} className="text-red-500" />
            </button>
          </div>
          <div
            class={`text-black rounded-lg w-fit flex flex-col gap-2 p-4 absolute bg-gray-500 ${
              isOpen ? "" : "hidden"
            }`}
          >
            <button
              onClick={() => uploadTaskPending(task)}
              disabled={task.pending}
              className="px-4 text-sm text-center bg-yellow-900 text-yellow-300 rounded-xl hover:bg-yellow-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Pendente
            </button>
            <button
              onClick={() => uploadTaskInProgress(task)}
              disabled={task.inProgress}
              className="px-4 text-sm text-center rounded-xl bg-blue-900 text-blue-300 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Andamento
            </button>
            <button
              onClick={() => uploadTaskReady(task)}
              disabled={task.ready}
              className="px-4 text-sm text-center rounded-xl bg-green-900 text-green-300 hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Pronto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
