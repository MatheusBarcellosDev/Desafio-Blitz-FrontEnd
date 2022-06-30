import React, { useContext, useState, useEffect } from "react";
import api from "../services/api";
import { Header } from "../components/Header";
import { CardTask } from "../components/CardTask";
import { AuthContext } from "../context/auth";
import { CircleWavyCheck, Desktop, Warning } from "phosphor-react";
import { toast } from "react-toastify";

export function DashboardTasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  const handleNewTask = (e) => {
    e.preventDefault();
    if (newTask.length === 0) {
      return toast.error("Você precisa digitar uma tarefa!");
    }
    api
      .post("/task", {
        content: newTask,
        pending: true,
        inProgress: false,
        ready: false,
      })
      .then((response) => {
        setTasks([...tasks, response.data]);
        setNewTask("");
      });
  };

  useEffect(() => {
    api
      .get("task", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setTasks(res.data.tasks);
      });
  }, [tasks]);

  return (
    <div className="flex flex-col min-h-screen p-8">
      <Header />
      <main className="flex flex-1 flex-col">
        <section className="m-10">
          <form className="flex justify-center" onSubmit={handleNewTask}>
            <div className="flex w-1/3">
              <input
                type="text"
                id="task"
                className="bg-gray-500 p-4 rounded-tl-lg rounded-bl-lg w-full h-12 focus:outline-none"
                placeholder="Nova tarefa"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-tr-lg rounded-br-lg"
              >
                Add
              </button>
            </div>
          </form>
        </section>
        <section className="flex flex-1 items-start justify-center gap-20">
          <div className="flex w-1/4">
            <div className="mt-5 bg-gray-500 rounded-lg p-4 flex flex-col gap-5 w-full">
              <div className="flex items-center justify-center gap-2">
                <h1 className="text-md py-1 text-yellow-300">Pendente</h1>
                <Warning size={24} className="text-yellow-300" />
              </div>
              {tasks.filter((task) => task.pending === true).length > 0 ? (
                tasks
                  .filter((task) => task.pending)
                  .map((task) => (
                    <CardTask
                      key={task._id}
                      task={task}
                      id={task.id}
                      update={setTasks}
                    />
                  ))
              ) : (
                <div className="text-center">
                  <p className="text-gray-400 italic">
                    Nenhuma tarefa pendente
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex w-1/4 ">
            <div className="mt-5 bg-gray-500 rounded-lg  p-4 flex flex-col gap-5 w-full">
              <div className="flex items-center justify-center gap-2">
                <h1 className="text-md py-1 text-blue-300">Em andamento</h1>
                <Desktop size={24} className="text-blue-300" />
              </div>
              {tasks.filter((task) => task.inProgress === true).length > 0 ? (
                tasks
                  .filter((task) => task.inProgress)
                  .map((task) => (
                    <CardTask
                      key={task._id}
                      task={task}
                      id={task.id}
                      update={setTasks}
                    />
                  ))
              ) : (
                <div className="text-center">
                  <p className="text-gray-400 italic">
                    Nenhuma tarefa em andamento
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex w-1/4">
            <div className="mt-5 bg-gray-500 rounded-lg p-4 flex flex-col gap-5 w-full">
              <div className="flex items-center justify-center gap-2">
                <h1 className="text-md py-1 text-green-300">Pronto</h1>
                <CircleWavyCheck size={24} className="text-green-300" />
              </div>
              {tasks.filter((task) => task.ready === true).length > 0 ? (
                tasks
                  .filter((task) => task.ready)
                  .map((task) => (
                    <CardTask
                      key={task._id}
                      task={task}
                      id={task.id}
                      update={setTasks}
                    />
                  ))
              ) : (
                <div className="text-center">
                  <p className="text-gray-400 italic">Nenhuma tarefa pronta</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full w-1/4 m-auto"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
