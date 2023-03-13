import React from "react";

// Images
import REDTechnologiesLogo from "../images/red-technologies-logo.png";

// Icons
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Header() {
    return (
        <header className="App-header">
            <div className="headerSections">
                <a href="/"><img src={REDTechnologiesLogo} alt="RED Technologies logo" /></a>
                <h1>Home</h1>
            </div>
            <div className="headerSections">
                <a href="/#"><SettingsIcon fontSize="large" sx={{ m: 1 }} /></a>
                <a href="/#"><AccountCircleIcon fontSize="large" sx={{ m: 1 }} /></a>
            </div>
        </header>
    );
}
