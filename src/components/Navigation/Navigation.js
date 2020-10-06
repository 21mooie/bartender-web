import React, {useEffect, useState} from "react";
import {Link, Redirect, useLocation} from "react-router-dom";
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

import * as mutations from '../../store/mutations';
import {connect} from "react-redux";
import { useCookies } from 'react-cookie';
import './Navigation.css';
import {Routes} from "../../consts/routes";

const Navigation = ({navUrls, clearState}) => {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const routerLocation = useLocation();
  const [location, setLocation] = useState('');
  const [show, setShow] = useState(false);
  const [redirectVal, setRedirectVal] = useState(null);

  useEffect(() => {
    setLocation(routerLocation.pathname);
    if (navUrls.find(url => url === location)) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [routerLocation.pathname, location, navUrls],);

  const signOut = () => {
    console.log('clicked');
    clearState();
    removeCookie('token');
    setRedirectVal(<Redirect to="/"/>);
  }

  return (
    <div>
      {
        show ? (
          <div className="header">
            <img src="https://press.hulu.com/wp-content/uploads/2020/02/hulu-white.png" />
            <div className="header__icons">
              <Link to="dashboard" className={`header__icon ${location === Routes.DASHBOARD ? 'header__icon-active' : ''}`}>
                  <DashboardIcon />
                  <p>Dashboard</p>
              </Link>

              <Link className={`header__icon ${location === Routes.USER ? 'header__icon-active' : ''}`} to='/user'>
                <PersonIcon />
                <p>Profile</p>
              </Link>

              <Link className={`header__icon ${location === Routes.SEARCH ? 'header__icon-active' : ''}`} to='/search'>
                <SearchIcon />
                <p>Search</p>
              </Link>

              <div className="header__icon" onClick={() => signOut()}>
                <MeetingRoomIcon className="header__icon"/>
                <p className="header__icon">Sign Out</p>
              </div>
              {redirectVal}
            </div>
          </div>
        ) : <></>
      }
    </div>
  )
}

export default Navigation;

const mapDispatchToProps = (dispatch) => ({
  clearState() {
    dispatch(mutations.requestClearState(null));
  }
});

export const ConnectedNavigation = connect(null, mapDispatchToProps)(Navigation);

