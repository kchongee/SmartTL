import React from 'react'
import {LineStyle,Timeline,Home,TrendingUp,Storage,QueryStats,Lightbulb,Leaderboard,Dashboard,LocalHospital} from '@mui/icons-material';
import "./sidebar.css";
import {
    NavLink
} from "react-router-dom";

export default function Sidebar({className,top,handleClose}) {          
    
    return (
        <div className={`sidebar ${className} ${top?"top":""}`}>
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">                                                
                        <NavLink to="/" className="sidebarListItem" onClick={handleClose}>
                            <Home className="sidebarIcon"/>
                            <span>Home</span>
                        </NavLink>
                        <NavLink to="/component" className="sidebarListItem" onClick={handleClose}>
                            <Lightbulb className="sidebarIcon"/>
                            <span>Component</span>
                        </NavLink>
                        <NavLink to="/emergency" className="sidebarListItem" onClick={handleClose}>
                            <LocalHospital className="sidebarIcon"/>
                            <span>Ambulance</span>
                        </NavLink>
                        <NavLink to="/insight" className="sidebarListItem" onClick={handleClose}>
                            <Leaderboard className="sidebarIcon"/>
                            <span>Statistic</span>
                        </NavLink>                        
                        <NavLink to="/firebase" className="sidebarListItem" onClick={handleClose}>
                            <Storage className="sidebarIcon"/>
                            <span>Firebase</span>
                        </NavLink>                        
                    </ul>
                </div>                
            </div>
        </div>
    )
}
