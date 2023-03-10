import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
    { field: "orderId", headerName: "Order ID", width: 300 },
    { field: "createdDate", headerName: "Creation Date", width: 200 },
    { field: "createdByUserName", headerName: "Created By", width: 90 },
    { field: "orderType", headerName: "Order Type", width: 130 },
    { field: "customerName", headerName: "Customer", width: 130 }
];

// Manual Test Data
// const orders = [
//     { orderId: 1, createdDate: "Wednesday, 1 March 2023", createdByUserName: "Alex", orderType: "Standard", customerName: "Kroger" },
//     { orderId: 2, createdDate: "Wednesday, 1 March 2023", createdByUserName: "Zach", orderType: "ReturnOrder", customerName: "Aldi" },
//     { orderId: 3, createdDate: "Wednesday, 1 March 2023", createdByUserName: "Josh", orderType: "TransferOrder", customerName: "SEC" },
//     { orderId: 4, createdDate: "Wednesday, 1 March 2023", createdByUserName: "Ryan", orderType: "SaleOrder", customerName: "CNG" },
//     { orderId: 5, createdDate: "Wednesday, 1 March 2023", createdByUserName: "Emma", orderType: "PurchaseOrder", customerName: "XPO Logistics" },
//     { orderId: 6, createdDate: "Wednesday, 1 March 2023", createdByUserName: "Bob", orderType: "Standard", customerName: "Kroger" },
//     { orderId: 7, createdDate: null, createdByUserName: "Ferrara", orderType: "Standard", customerName: "Kroger" },
//     { orderId: 8, createdDate: "Wednesday, 1 March 2023", createdByUserName: "Rossini", orderType: "Standard", customerName: "Kroger" },
//     { orderId: 9, createdDate: null, createdByUserName: "Harvey", orderType: "Standard", customerName: "Kroger" }
// ];

export default function DataTable() {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch("https://red-candidate-web.azurewebsites.net/api/Orders", {
            headers: {
                ApiKey: `${process.env.REACT_APP_API_KEY}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setOrders(data);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <div style={{ height: 400, width: "100%" }}>
            <DataGrid
                rows={orders}
                columns={columns}
                getRowId={(row) => row.orderId}
                initialState={{
                    pagination: { paginationModel: { pageSize: 5 } }
                }}
                pageSizeOptions={[5, 10, 25]}
                checkboxSelection
            />
        </div>
    );
}
