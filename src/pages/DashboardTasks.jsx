import React, { useContext } from "react";
import { Header } from "../components/Header";
import { CardTask } from "../components/CardTask";

import { AuthContext } from "../context/auth";
import { CircleWavyCheck, Desktop, Warning } from "phosphor-react";

export function DashboardTasks() {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-col min-h-screen p-8">
      <Header />
      <main className="flex flex-1 items-start justify-center border-gray-500 rounded gap-20">
        <div className="flex w-1/4">
          <div className="mt-5 bg-gray-500 rounded-lg p-4 flex flex-col gap-5 w-full">
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-md py-1 text-yellow-300">Pendente</h1>
              <Warning size={24} className="text-yellow-300" />
            </div>
            <CardTask title="Tarefa 1" />
            <CardTask title="Tarefa 2" />
            <CardTask title="Tarefa 3" />
          </div>
        </div>
        <div className="flex w-1/4 ">
          <div className="mt-5 bg-gray-500 rounded-lg  p-4 flex flex-col gap-5 w-full">
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-md py-1 text-blue-300">Em andamento</h1>
              <Desktop size={24} className="text-blue-300" />
            </div>
          </div>
        </div>
        <div className="flex w-1/4">
          <div className="mt-5 bg-gray-500 rounded-lg p-4 flex flex-col gap-5 w-full">
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-md py-1 text-green-300">Pronto</h1>
              <CircleWavyCheck size={24} className="text-green-300" />
            </div>
          </div>
        </div>
      </main>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
