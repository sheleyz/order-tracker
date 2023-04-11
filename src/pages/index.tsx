import React from "react";

// Components
import Seo from "../components/Seo";
import Header from "../components/Header";
import OrdersGrid from "../components/OrdersGrid";

function IndexPage() {
    return (
        <div className="App">
            <Seo />
            <Header />
            <OrdersGrid />
        </div>
    );
}

export default IndexPage;
