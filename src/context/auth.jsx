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
    setLoading(true);
    try {
      await api.post("/session", { email, password }).then((res) => {
        const { id, name, email, token } = res.data;

        setUser({ id, name, email, token });
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("token", token);
        setLoading(false);
        navigate("/tasks");
        toast.success("Login realizado com sucesso!");
      });
    } catch (err) {
      toast.error("Usuário ou senha inválidos");
      setLoading(false);
      console.log(err.message);
    }
  };

  const signUp = async (name, email, password) => {
    setLoading(true);
    try {
      await api.post("/users", { name, email, password }).then((res) => {
        setLoading(false);
        navigate("/");
        toast.success("Usuário criado com sucesso!");
      });
    } catch (err) {
      toast.error("Erro ao criar usuário");
      setLoading(false);
      console.log(err.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, signIn, loading, logout, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};
