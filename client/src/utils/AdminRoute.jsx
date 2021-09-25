import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from 'react-redux';

function AdminRoute({ component: Component, ...restOfProps }) {

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        {
            
            if(!userInfo.isAdmin) return <Redirect to="/" />
            else if(userInfo) return <Component {...props} />
            else return <Redirect to="/" />
        }
        
      }
    />
  );
}

export default AdminRoute;