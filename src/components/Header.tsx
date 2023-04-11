import React from "react";

// Icons
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SellIcon from '@mui/icons-material/Sell';

export default function Header() {
    return (
        <header className="App-header">
            <div className="headerSections">
                <a href="/"><SellIcon fontSize="large" sx={{ mx: 1, pt: 1}} htmlColor="#1976D2" /></a>
                <h1>Home</h1>
            </div>
            <div className="headerSections">
                <a href="/#"><SettingsIcon fontSize="large" sx={{ m: 1 }} /></a>
                <a href="/#"><AccountCircleIcon fontSize="large" sx={{ m: 1 }} /></a>
            </div>
        </header>
    );
}
