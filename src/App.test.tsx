import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders order tracker heading", () => {
    render(<App />);
    const headingElement = screen.getByText(/Home/i);
    expect(headingElement).toBeInTheDocument();
});

test("renders OrdersGrid", () => {
    render(<App />);
    const gridElement = screen.getByText(/Order ID/i);
    expect(gridElement).toBeInTheDocument();
});
