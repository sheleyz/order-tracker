import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// Define Grid Columns
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

export default function OrdersTable() {
    const [orders, setOrders] = useState([{ orderId: "", createdDate: "", createdByUserName: "", orderType: "", customerName: "" }]);
    const [orderType, setOrderType] = useState("");
    let filteredOrders = orders;

    // Handle Order Type dropdown selection
    const handleChange = (event: SelectChangeEvent) => {
        setOrderType(event.target.value);
    };

    // Filter orders based on Order Type dropdown selection
    if (orderType !== "") {
        filteredOrders = orders.filter((order) => order.orderType === orderType);
    }

    useEffect(() => {
        // GET orders from API
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
            {/* Order Type Dropdown Filter */}
            <FormControl sx={{ m: 1, minWidth: 130 }} size="small">
                <InputLabel id="select-order-type-label">Order Type</InputLabel>
                <Select labelId="select-order-type-label" id="select-order-type" value={orderType} label="Order Type" onChange={handleChange}>
                    <MenuItem value={""}>All</MenuItem>
                    <MenuItem value={"Standard"}>Standard</MenuItem>
                    <MenuItem value={"ReturnOrder"}>Return Order</MenuItem>
                    <MenuItem value={"TransferOrder"}>Transfer Order</MenuItem>
                    <MenuItem value={"SaleOrder"}>Sale Order</MenuItem>
                    <MenuItem value={"PurchaseOrder"}>Purchase Order</MenuItem>
                </Select>
            </FormControl>

            {/* View of Order Entities */}
            <DataGrid
                rows={filteredOrders}
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
