import React, { useContext, useState } from "react";
import { Briefcase, SpinnerGap } from "phosphor-react";

import { AuthContext } from "../context/auth";
import { Link } from "react-router-dom";

export function Login() {
  const { loading, signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    signIn(email, password);
  };

  return (
    <div className="rounded border border-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center max-w-lg w-full bg-gray-700 border border-gray-500">
        <div className=" flex flex-1 w-full flex-col items-center mt-10">
          <div className="py-2 px-6 rounded flex gap-5 items-center">
            <strong className="text-red-500 text-8xl italic uppercase mt-2">
              Blitz
            </strong>
            <Briefcase size={82} color={"#e71224"} />
          </div>
        </div>
        <form
          className="flex flex-col p-10 gap-5 w-full"
          onSubmit={handleSubmit}
        >
          <label className="text-gray-700 hidden" htmlFor="email">
            Email
          </label>
          <input
            autoComplete="off"
            id="email"
            className="bg-gray-900 rounded px-5 h-12 w-full"
            placeholder="Digite seu e-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="text-gray-700 hidden" htmlFor="senha">
            Senha
          </label>
          <input
            id="senha"
            className="bg-gray-900  rounded px-5 h-12 w-full"
            placeholder="Digite sua senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="bg-green-500 rounded px-5 h-12 mt-5 mb-5 text-white uppercase font-bold hover:bg-green-700 transition-colors"
            type="submit"
          >
            {loading ? (
              <SpinnerGap size={32} className="m-auto animate-spin" />
            ) : (
              "Entrar"
            )}
          </button>
          <Link to="/signup">
            <span className="border-t border-gray-300 py-3 block text-center">
              Não tem uma conta? <strong>Cadastre-se</strong>
            </span>
          </Link>
        </form>
      </div>
    </div>
  );
}
