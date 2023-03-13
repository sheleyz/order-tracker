import React, { useState, useEffect, ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { v4 as uuidv4 } from "uuid";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";

// Icons
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

// Define Grid Columns
const columns: GridColDef[] = [
    { field: "orderId", headerName: "Order ID", width: 325 },
    { field: "createdDate", headerName: "Creation Date", width: 225 },
    { field: "createdByUserName", headerName: "Created By", width: 150 },
    { field: "orderType", headerName: "Order Type", width: 150 },
    { field: "customerName", headerName: "Customer", width: 150 }
];

export default function OrdersGrid() {
    const [orders, setOrders] = useState([{ orderId: "", createdDate: "", createdByUserName: "", orderType: "", customerName: "" }]);
    const [orderType, setOrderType] = useState("");
    const [orderId, setOrderId] = useState("");
    const [addedUserName, setAddedUserName] = useState("");
    const [addedOrderType, setAddedOrderType] = useState("");
    const [addedCustomerName, setAddedCustomerName] = useState("");
    const [open, setOpen] = useState(false);
    const [showError, setShowError] = useState(false);
    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
    let filteredOrders = orders;

    // Handle Order ID search input
    const handleOrderIdChange = (event: ChangeEvent<HTMLInputElement>) => {
        setOrderId(event.target.value.toLowerCase());
    };

    // Handle Order Type dropdown selection
    const handleOrderTypeChange = (event: SelectChangeEvent) => {
        setOrderType(event.target.value);
    };

    // Handle Create Order form: User Name input
    const handleAddedUserName = (event: ChangeEvent<HTMLInputElement>) => {
        setAddedUserName(event.target.value);
    };

    // Handle Create Order form: Order Type dropdown selection
    const handleAddedOrderType = (event: SelectChangeEvent) => {
        setAddedOrderType(event.target.value);
    };

    // Handle Create Order form: Customer Name input
    const handleAddedCustomerName = (event: ChangeEvent<HTMLInputElement>) => {
        setAddedCustomerName(event.target.value);
    };

    // Handle button click to create order
    const handleCreate = (userNameInput: string, orderTypeInput: string, customerNameInput: string) => {
        // Get today's date (for the Created Date)
        const today = new Date();
        let todayString = today.toDateString();

        if (userNameInput !== "" && orderTypeInput !== "" && customerNameInput !== "") {
            // POST created order to API
            fetch("https://red-candidate-web.azurewebsites.net/api/Orders", {
                method: "POST",
                headers: {
                    ApiKey: `${process.env.REACT_APP_API_KEY}`,
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    orderId: uuidv4(), // Generates random UUID
                    createdDate: todayString,
                    createdByUserName: userNameInput,
                    orderType: orderTypeInput,
                    customerName: customerNameInput
                })
            })
                .then((response) => response.json())
                .then(() => getOrderData())
                .catch((error) => console.error(error));

            setShowError(false);
            setAddedUserName("");
            setAddedOrderType("");
            setAddedCustomerName("");
            setOpen(false);
        } else {
            setShowError(true);
        }
    };

    // Handle button click to delete order(s)
    const handleDelete = (deleteOrderIds: GridRowSelectionModel) => {
        // POST deleted order(s) to API
        fetch("https://red-candidate-web.azurewebsites.net/api/Orders/Delete", {
            method: "POST",
            headers: {
                ApiKey: `${process.env.REACT_APP_API_KEY}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(deleteOrderIds)
        })
            .then(() => getOrderData())
            .catch((error) => console.error(error));
    };

    // Filter orders based on Order ID search input
    if (orderId !== "") {
        filteredOrders = orders.filter((order) => {
            if (order.orderId.indexOf(orderId) > -1) {
                return order;
            } else {
                return "";
            }
        });
    }
    // Filter orders based on Order Type dropdown selection
    if (orderType !== "") {
        filteredOrders = orders.filter((order) => order.orderType === orderType);
    }

    const getOrderData = () => {
        // Consume REST APIs in React: https://www.freecodecamp.org/news/how-to-consume-rest-apis-in-react/
        // API Page: https://red-candidate-web.azurewebsites.net/index.html

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
    };

    useEffect(() => {
        getOrderData();
    }, []);

    // Material UI Docs: https://mui.com/material-ui/getting-started/overview/
    // MUI X DataGrid Docs: https://mui.com/x/react-data-grid/
    return (
        <div style={{ height: "70vh", width: "100%" }}>
            <div className="actionBar">
                {/* Search Order ID */}
                <TextField id="search-order-id" label="Order ID Search" variant="outlined" value={orderId} onChange={handleOrderIdChange} sx={{ m: 1 }} size="small" />

                {/* Order Type Dropdown Filter */}
                <FormControl sx={{ m: 1, minWidth: 130 }} size="small">
                    <InputLabel id="select-order-type-label">Order Type</InputLabel>
                    <Select labelId="select-order-type-label" id="select-order-type" value={orderType} label="Order Type" onChange={handleOrderTypeChange}>
                        <MenuItem value={""}>All</MenuItem>
                        <MenuItem value={"Standard"}>Standard</MenuItem>
                        <MenuItem value={"ReturnOrder"}>Return Order</MenuItem>
                        <MenuItem value={"TransferOrder"}>Transfer Order</MenuItem>
                        <MenuItem value={"SaleOrder"}>Sale Order</MenuItem>
                        <MenuItem value={"PurchaseOrder"}>Purchase Order</MenuItem>
                    </Select>
                </FormControl>

                {/* Create Order Entity */}
                <Button variant="contained" onClick={() => setOpen(true)} sx={{ m: 1 }}>
                    <AddIcon /> Create Order
                </Button>
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>Create Order</DialogTitle>
                    {showError && <Alert severity="error">Please fill out all fields to create an order.</Alert>}
                    <DialogContent>
                        <DialogContentText>To create an order, please enter your name, the order type, and the customer name.</DialogContentText>
                        <TextField autoFocus required id="user-name" label="User Name" fullWidth variant="outlined" sx={{ my: 1 }} size="small" value={addedUserName} onChange={handleAddedUserName} />
                        <FormControl required sx={{ my: 1, minWidth: 135 }} size="small">
                            <InputLabel id="add-order-type-label">Order Type</InputLabel>
                            <Select labelId="add-order-type-label" id="add-order-type" label="Order Type" value={addedOrderType} onChange={handleAddedOrderType}>
                                <MenuItem value={"Standard"}>Standard</MenuItem>
                                <MenuItem value={"ReturnOrder"}>Return Order</MenuItem>
                                <MenuItem value={"TransferOrder"}>Transfer Order</MenuItem>
                                <MenuItem value={"SaleOrder"}>Sale Order</MenuItem>
                                <MenuItem value={"PurchaseOrder"}>Purchase Order</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField required id="customer-name" label="Customer Name" fullWidth variant="outlined" sx={{ my: 1 }} size="small" value={addedCustomerName} onChange={handleAddedCustomerName} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {setOpen(false); setShowError(false);}}>Cancel</Button>
                        <Button onClick={() => handleCreate(addedUserName, addedOrderType, addedCustomerName)}>Create</Button>
                    </DialogActions>
                </Dialog>

                {/* Delete Selected Order(s) */}
                {rowSelectionModel.length !== 0 && (
                    <Button variant="contained" onClick={() => handleDelete(rowSelectionModel)} sx={{ m: 1 }}>
                        <DeleteIcon /> Delete Selected
                    </Button>
                )}
            </div>

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
                onRowSelectionModelChange={(newRowSelectionModel) => setRowSelectionModel(newRowSelectionModel)}
                rowSelectionModel={rowSelectionModel}
            />
        </div>
    );
}
