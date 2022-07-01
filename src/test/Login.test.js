import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen } from "@testing-library/react";
import { Login } from "../pages/Login";
import { AuthProvider } from "../context/auth";
import { Router } from "react-router-dom";

//https://stackoverflow.com/questions/69859509/cannot-read-properties-of-undefined-reading-pathname-when-testing-pages-in
const { createMemoryHistory } = require("history");

//https://blog.logrocket.com/testing-react-router-usenavigate-hook-react-testing-library/
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("Login", () => {
  it("Renders without crashing", () => {
    const history = createMemoryHistory();
    render(
      <AuthProvider>
        <Router location={history.location} navigator={history}>
          <Login />
        </Router>
      </AuthProvider>
    );
  });

  it("Renders the input email", () => {
    const history = createMemoryHistory();
    render(
      <AuthProvider>
        <Router location={history.location} navigator={history}>
          <Login />
        </Router>
      </AuthProvider>
    );
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("Renders the input senha", () => {
    const history = createMemoryHistory();
    render(
      <AuthProvider>
        <Router location={history.location} navigator={history}>
          <Login />
        </Router>
      </AuthProvider>
    );
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
  });

  it("Renders the button", () => {
    const history = createMemoryHistory();
    render(
      <AuthProvider>
        <Router location={history.location} navigator={history}>
          <Login />
        </Router>
      </AuthProvider>
    );
    expect(screen.getByText("Entrar")).toBeInTheDocument();
  });

  it("Renders don't have an account", () => {
    const history = createMemoryHistory();
    render(
      <AuthProvider>
        <Router location={history.location} navigator={history}>
          <Login />
        </Router>
      </AuthProvider>
    );
    expect(screen.getByText("Não tem uma conta?")).toBeInTheDocument();
  });
});
