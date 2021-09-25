
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector} from 'react-redux'
import ReactRoundedImage from "react-rounded-image";




export default function Header()

{
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    

    return(
   <header className="header">
          <div className="brand">
            <button >&#9776;</button>
            <Link to="/">RH</Link>
          </div>
          <div className="header-links">
            
         {userInfo && (userInfo.admin===true && (
            <>
          
              <Link style={{display:"contents"}} to="/profile" ><ReactRoundedImage image={`${process.env.REACT_APP_IP}${userInfo.avatar}`} borderRadius="50"
                    imageWidth="50" roundedSize="5" display="contents"
                    imageHeight="50" hoverColor="#DD1144" /></Link>
              
              <div className="dropdown">
                <a href="#" style={{fontSize:"35px"}}>---</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/holidays">Demands</Link>
                    <Link to="/users">Users</Link>
                  </li>
                </ul>
              </div>
              </>
            )
           )}
      
           {userInfo && userInfo.admin===false && (
             <>
              <Link style={{display:"contents"}} to="/profile" >
                <ReactRoundedImage image={`${process.env.REACT_APP_IP}${userInfo.avatar}`} borderRadius="50"
                    imageWidth="50" roundedSize="5" display="contents"
                    imageHeight="50" hoverColor="#DD1144" /></Link>
              <Link to="/request">Holidays</Link>       
              </>
           )}
            {!userInfo && <Link to="/">Sign In</Link>}
          </div>
        </header>


    )
}


