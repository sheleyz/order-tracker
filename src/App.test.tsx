import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders order tracker heading", () => {
    render(<App />);
    const headingElement = screen.getByText(/Order Tracker/i);
    expect(headingElement).toBeInTheDocument();
});
