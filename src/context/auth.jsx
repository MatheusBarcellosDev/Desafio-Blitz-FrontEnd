import React, { useState, createContext, useEffect } from "react";

import { toast } from "react-toastify";

import api from "../services/api";

import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recovereUser = localStorage.getItem("user");

    if (recovereUser) {
      setUser(JSON.parse(recovereUser));
    }

    setLoading(false);
  }, []);

  const signIn = async (email, password) => {
    try {
      const user = await api
        .post("/session", { email, password })
        .then((res) => {
          console.log(res);
          const { id, name, email, token } = res.data;

          setUser({ id, name, email, token });
          localStorage.setItem("user", JSON.stringify(res.data));
          navigate("/tasks");
          toast.success("Login realizado com sucesso!");
        });
    } catch (err) {
      toast.error("Usuário ou senha inválidos");
      console.log("cheguei ");
      console.log(err.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, signIn, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
