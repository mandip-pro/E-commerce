

import React, {  useState } from "react";
import "./Dashboard.css"; // Assuming you have a CSS file for styles
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate=useNavigate()
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  
  const handleLogout=async()=>{
    localStorage.clear()
    navigate ("/admin/login")
}


  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

 
  return (
    <div className={`dashboard ${isSidebarCollapsed ? "collapsed" : ""}`}>
      <div className={`sidebar ${isSidebarCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">⚙️</span>
            <span className="logo-text">AdminPanel</span>
          </div>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <span className="icon">◀</span>
          </button>
        </div>
        <div className="sidebar-nav">
          <ul className="nav-list">
            {/* Dashboard */}
            <Link to='/admin/dashboard'> <li className="nav-item">
              <a href="#" className="nav-link active">
                <i className="icon">📊</i>
                <span className="link-text">Dashboard</span>
                <span className="tooltip">Dashboard</span>
              </a>
            </li></Link>

            {/* Products */}
            <Link to='/admin/productCreate'> <li className="nav-item">
              <a href="#" className="nav-link dropdown-toggle">
                <i className="icon">📦</i>
                <span className="link-text">Create Products</span>
                <span className="tooltip">Create Products</span>
              </a>
              
            </li></Link>

            {/* Other items */}
            <Link to='/admin/allObject'> <li className="nav-item">
              <a href="#" className="nav-link">
                📝<span className="link-text">Products</span>
                <span className="tooltip">Products</span>
              </a>
            </li></Link>
            <li className="nav-item">
              <a href="#" className="nav-link">
                ⚙️ <span className="link-text">Settings</span>
                <span className="tooltip">Settings</span>
              </a>
            </li>
             
              <li className="nav-item" onClick={handleLogout}>
              <a href="#" className="nav-link">
                <span className="icon">🚪</span>
                <span className="link-text">LogOut</span>
                <span className="tooltip">LogOut</span>
              </a>
            </li>
            
          </ul>
        </div>
      </div>
      <div className="sidebar-overlay"></div>
      <div className="main-content">
        <Header  />
        <div className="content">
          <h1>hi</h1>
         </div>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <header className="header">
      <div className="search-bar">
        <i className="icon">🔍</i>
        <input type="text" placeholder="Search..." />
      </div>
      <div className="header-right">
        <div className="header-icon">
          <span className="icon">🔔</span>
          <span className="badge">3</span>
        </div>
        <div className="header-icon">
          <span className="icon">✉️</span>
          <span className="badge">5</span>
        </div>
        <div className="user-profile" id="user-profile">
          <div className="user-avatar">JD</div>
          <div className="user-info">
            <div className="user-name">John Doe</div>
            <div className="user-role">Administrator</div>
          </div>
        </div>
      </div>

    </header>
  );
};

export default Dashboard;
