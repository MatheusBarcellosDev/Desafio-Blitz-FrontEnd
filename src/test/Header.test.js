import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen } from "@testing-library/react";
import { Header } from "../components/Header";

describe("Header", () => {
  it("Renders without crashing", () => {
    render(<Header />);
  });

  it("Renders the logo", () => {
    render(<Header />);
    expect(screen.getByText("Todo List")).toBeInTheDocument();
  });
});
