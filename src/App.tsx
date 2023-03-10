import React from "react";
import "./index.css";

// Components
import DataTable from "./components/OrdersTable";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Order Tracker</h1>
            </header>
            <DataTable />
        </div>
    );
}

export default App;
