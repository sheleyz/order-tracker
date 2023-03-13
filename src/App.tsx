import React from "react";
import "./index.css";

// Components
import Header from "./components/Header";
import OrdersGrid from "./components/OrdersGrid";

function App() {
    return (
        <div className="App">
            <Header />
            <OrdersGrid />
        </div>
    );
}

export default App;
