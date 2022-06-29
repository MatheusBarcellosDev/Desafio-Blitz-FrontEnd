import { Gear, Trash } from "phosphor-react";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth";
import md5 from "crypto-js/md5";

export function CardTask({ title }) {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);

  const { user } = useContext(AuthContext);

  const gravatar = md5(user.email).toString();

  return (
    <div className="bg-bgColor-default px-4 py-3 rounded-xl">
      <div className="pb-10 pt-1 px-1">
        <strong className="text-lg italic break-words">{title}</strong>
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
            <button>
              <Trash size={16} className="text-red-500" />
            </button>
          </div>
          <div
            class={`text-black rounded-lg w-fit flex flex-col gap-2 p-4 absolute bg-gray-500 ${
              isOpen ? "" : "hidden"
            }`}
          >
            <button className="px-4 text-sm text-center bg-yellow-900 text-yellow-300 rounded-xl hover:bg-yellow-800">
              Pendente
            </button>
            <button className="px-4 text-sm text-center rounded-xl bg-blue-900 text-blue-300 hover:bg-blue-800">
              Andamento
            </button>
            <button className="px-4 text-sm text-center rounded-xl bg-green-900 text-green-300 hover:bg-green-800">
              Pronto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
