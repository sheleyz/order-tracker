import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
    { field: "orderId", headerName: "Order ID", width: 70 },
    { field: "createdDate", headerName: "Creation Date", type: "date", width: 130, valueGetter: ({ value }) => value && new Date(value) },
    { field: "createdByUserName", headerName: "Created By", width: 90 },
    { field: "orderType", headerName: "Order Type", width: 130 },
    { field: "customerName", headerName: "Customer", width: 130 }
];

const rows = [
    { orderId: 1, createdDate: "2022-07-21", createdByUserName: "Alex", orderType: "Standard", customerName: "Kroger" },
    { orderId: 2, createdDate: "2022-07-21", createdByUserName: "Zach", orderType: "ReturnOrder", customerName: "Aldi" },
    { orderId: 3, createdDate: "2022-07-21", createdByUserName: "Josh", orderType: "TransferOrder", customerName: "SEC" },
    { orderId: 4, createdDate: "2022-07-21", createdByUserName: "Ryan", orderType: "SaleOrder", customerName: "CNG" },
    { orderId: 5, createdDate: "2022-07-21", createdByUserName: "Emma", orderType: "PurchaseOrder", customerName: "XPO Logistics" },
    { orderId: 6, createdDate: "2022-07-21", createdByUserName: "Bob", orderType: "Standard", customerName: "Kroger" },
    { orderId: 7, createdDate: null, createdByUserName: "Ferrara", orderType: "Standard", customerName: "Kroger" },
    { orderId: 8, createdDate: "2022-07-21", createdByUserName: "Rossini", orderType: "Standard", customerName: "Kroger" },
    { orderId: 9, createdDate: null, createdByUserName: "Harvey", orderType: "Standard", customerName: "Kroger" }
];

export default function DataTable() {
    return (
        <div style={{ height: 400, width: "100%" }}>
            <DataGrid
                rows={rows}
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
