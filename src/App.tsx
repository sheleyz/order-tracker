import React from "react";
import "./index.css";

// Components
import Header from "./components/Header";
import OrdersTable from "./components/OrdersTable";

function App() {
    return (
        <div className="App">
            <Header />
            <OrdersTable />
        </div>
    );
}

export default App;
