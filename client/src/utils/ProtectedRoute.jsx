import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from 'react-redux';

function ProtectedRoute({ component: Component, ...restOfProps }) {

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        {
            if( !userInfo) return <Redirect to="/" />
            else if(userInfo && (userInfo.admin) && 
                (props.location.pathname!=="/users" && props.location.pathname!=="/holidays" && 
                props.location.pathname!=="/profile" ))
                return <Redirect to="/" />
            else if(userInfo && (!userInfo.admin)&& 
            (props.location.pathname!=="/profile" && props.location.pathname!=="/request") )
                return <Redirect to="/" />
            else return <Component {...props} />
        }
        
      }
    />
  );
}

export default ProtectedRoute;