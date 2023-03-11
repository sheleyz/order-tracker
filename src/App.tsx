import React from "react";
import "./index.css";

// Components
import OrdersTable from "./components/OrdersTable";

// Images
import REDTechnologiesLogo from "./images/red-technologies-logo.png";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={REDTechnologiesLogo} alt="RED Technologies logo" />
                <h1>Home</h1>
            </header>
            <OrdersTable />
        </div>
    );
}

export default App;
