import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen } from "@testing-library/react";
import { DashboardTasks } from "../pages/DashboardTasks";
import { AuthProvider } from "../context/auth";

//https://blog.logrocket.com/testing-react-router-usenavigate-hook-react-testing-library/
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("DashboardTasks", () => {
  it("Renders without crashing", () => {
    render(
      <AuthProvider>
        <DashboardTasks />
      </AuthProvider>
    );
  });

  it("Renders the input", () => {
    render(
      <AuthProvider>
        <DashboardTasks />
      </AuthProvider>
    );
    expect(screen.getByText("Nova Tarefa")).toBeInTheDocument();
  });

  it("Renders bottom add tasks", () => {
    render(
      <AuthProvider>
        <DashboardTasks />
      </AuthProvider>
    );
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  it("Renders pending column", () => {
    render(
      <AuthProvider>
        <DashboardTasks />
      </AuthProvider>
    );
    expect(screen.getByText("Pendente")).toBeInTheDocument();
  });

  it("Renders column in progress", () => {
    render(
      <AuthProvider>
        <DashboardTasks />
      </AuthProvider>
    );
    expect(screen.getByText("Em andamento")).toBeInTheDocument();
  });

  it("Renders done column", () => {
    render(
      <AuthProvider>
        <DashboardTasks />
      </AuthProvider>
    );
    expect(screen.getByText("Pronto")).toBeInTheDocument();
  });
});
