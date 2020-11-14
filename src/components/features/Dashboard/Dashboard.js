import React from 'react';
import { connect } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import {Redirect} from "react-router-dom";


export const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  function handleUnAuth() {
    if (!isAuthenticated) {
      return <Redirect to="/" />;
    } else {
      return data()
    }
  }

  function data() {
    return ( <div>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div> );
  }
   return (
     <>
      { handleUnAuth() }
    </>
   );
}

function mapStateToProps(state) {
  return {
    user: state
  }
}

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);
