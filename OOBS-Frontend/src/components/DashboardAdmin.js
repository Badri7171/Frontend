import React, { useState, useEffect } from "react";
import {
  //BrowserRouter as Router, Switch, Route,
  Link,
} from "react-router-dom";

function DashboardAdmin(props) {
  const [loggedUser, setLoggedUser] = useState("");

  useEffect(() => {
    setLoggedUser(localStorage.getItem("loggedUser"));
  }, []);

  const handleLogout = () =>{   
    localStorage.removeItem("loggedUser");
    window.location.href = "/";
  }
  return (
    <div className="container">
      <nav className="btn btn-warning navbar navbar-expand-lg navheader">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="#" className="nav-link">
                Welcome <b> {loggedUser}</b>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/CustomerProfile"} className="nav-link">
                Employee Details
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/Transfer"} className="nav-link">
                Transfer Amount
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/TransactionHistory"} className="nav-link">
              Transaction History
              </Link>
            </li>                      
            <li className="nav-item">
              <Link to="#" onClick={() =>handleLogout()} className="nav-link" style={{color:"black"}}>
                Logout 
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>

  );
}

export default DashboardAdmin;
