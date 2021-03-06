import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import {Link} from "react-router-dom";

import './Sidebar.css';

function Sidebar({isOpen, triggerCloseSidebar, triggerLogout, username}) {
  return (
    <div className={"sideBar " + (isOpen ? "sideBar--viewSidebar sideBar--zeroTop" : "sideBar--hideSidebar sideBar--negativeTop")}>
      <div className="sideBar__cancel">
        <CloseIcon fontSize="large" onClick={() => {triggerCloseSidebar()}}/>
      </div>
      <div className="sideBar__menu">
        <Link to="/dashboard" onClick={() => {triggerCloseSidebar()}}>
          <p>Dashboard</p>
        </Link>
        <Link to={`/user/${username}`} onClick={() => {triggerCloseSidebar()}}>
          <p>User</p>
        </Link>
        <Link to="/explore" onClick={() => {triggerCloseSidebar()}}>
          <p>Explore</p>
        </Link>
        <div onClick={() => {triggerCloseSidebar(); triggerLogout();}}>
          <p>Sign Out</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
