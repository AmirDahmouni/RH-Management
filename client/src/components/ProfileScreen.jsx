

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLazyQuery, useMutation } from "react-apollo"
import {
  USER_LOGOUT, USER_UPDATE_REQUEST,
   USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,
   USER_UPDATE_PASSWORD_SUCCESS,USER_UPDATE_PASSWORD_FAIL
} from "../constants/userConstants";
import Cookie from 'js-cookie';

import {USER_UPDATE_PASSWORD,USER_UPDATE} from "../queries/Users_Queries"
import {UPLOAD_IMG,AVATAR_DELETE } from "../queries/Files_Queries"

function ProfileScreen()
{
    const [name,setName]=useState('');
    const [email, setEmail] = useState('');
    const [username,setUsername]=useState('');
    const [surname,setSurname]=useState('');
    const [telephone, setTelephone] = useState('');
    const [avatar,setAvatar]=useState(null)

    const [departements,setDepartements]=useState( ['MOBILE','WEB','CLOUD',"UI/UX","BI","DEVOPS","IOT"])
    const [departement,setDepartement]=useState("")
    const [positions,setPositions]=useState(["developper","project manager","network administrator"," systems engineering manager","business analyst"]);
    const [position,setPosition]=useState()
    const [works,setWorks]=useState(["full remote","remote","office"])
    const [work,setWork]=useState()

    const [password, setPassword] = useState('');
    const [newpassword, setNewpassword] = useState('');

    
    const dispatch = useDispatch();
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo,loading,error,message } = userSignin;

    

    

    useEffect(() => {
      if (userInfo) {
        setEmail(userInfo.email);
        setName(userInfo.name);
        setUsername(userInfo.username);
        setSurname(userInfo.surname)
        setTelephone(userInfo.telephone)
        setDepartement(userInfo.departement)
        setPosition(userInfo.position)
        setWork(userInfo.work)
      }
    }, [userInfo])

    const handleLogout = () => {
      dispatch({type:USER_LOGOUT});
      Cookie.remove("userInfo");
      localStorage.clear();
      window.location="/"
    }
 
    const [updatePassword]=useMutation(USER_UPDATE_PASSWORD,{variables:{
      oldpassword:password,
      newpassword:newpassword
    },
    onError:err=>{
      dispatch({ type: USER_UPDATE_PASSWORD_FAIL, payload:err.message });
    },
    onCompleted:response=>{ 
      if(response.updateUserPassword) 
        dispatch({ type: USER_UPDATE_PASSWORD_SUCCESS, payload:"password updated" })
      else
        dispatch({ type: USER_UPDATE_PASSWORD_FAIL, payload:"error updating password " });
    }  
    })
    

    const [updateUser,{loading:loading_update,error:error_updating}] = useMutation(USER_UPDATE, {
      variables:{
        username,
        surname,
        name,
        email,
        telephone,
        avatar,
        position,
        departement,
        work
      },
      onCompleted: response => {
        
          if(response.updateUser)
            dispatch({ type: USER_UPDATE_SUCCESS, payload:{...response.updateUser,token:userInfo.token,message:"updating infos"}})
          else
            dispatch({ type: USER_UPDATE_FAIL, payload:error_updating });
      }   
    })
    
    
    const [uploadImg]=useMutation(UPLOAD_IMG,{
      onError:(err)=>console.log(err),
      onCompleted:(response)=>{
        if(response.uploadImage.error===null)
        setAvatar(response.uploadImage.path.substr(1,response.uploadImage.path.length))
        else console.log(response.uploadImage.error)
      }
    })

   
    const [deleteAvatar]=useMutation(AVATAR_DELETE)


    const onChange = ({target: {validity,files: [file]}}) =>{
      validity.valid && uploadImg({ variables: { file } });
    } 


    const submitHandlerpassword=()=>{
      dispatch({ type:USER_UPDATE_REQUEST});
      if(password!==newpassword)
      updatePassword()
      else 
      dispatch({ type: USER_UPDATE_FAIL, payload:"password incrorrect" });
    }

    const submitHandler=(e) => {
      e.preventDefault();
        if(name===''||username===''||email===''||telephone==='') 
         dispatch({ type: USER_UPDATE_FAIL, payload:"empty field(s)" });
        else {
          updateUser()
          deleteAvatar({variables:{path:userInfo.avatar}})
        }
    }

    return (
      <>
      <div className="profile">
      <div className="profile-info">
        <div className="form">
          <form onSubmit={submitHandler} >
            <ul className="form-container">
              <li>
                <h2>User Profile</h2>
              </li>
              <li>
                {loading && <p>loading ....</p>}
                {error&& <p>{error}</p>}
                {message && <p>{message}</p>}
              
              </li>
              <input type="file" onChange={onChange} />

              <li>
                <label htmlFor="name">Name</label>
                <input value={name} type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}/>
                
              </li>
              <li>
                <label htmlFor="email">Email</label>
                <input value={email} type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}/>
                
              </li>
              <li>
                <label htmlFor="username">Username</label>
                <input value={username} type="text" name="username" id="username" onChange={(e) => setUsername(e.target.value)}/>            
              </li>
              <li>
                <label htmlFor="username">Surname</label>
                <input value={surname} type="text" name="surname" id="surname" onChange={(e) => setSurname(e.target.value)}/>            
              </li>

              <li>
             <label htmlFor="telephone">Telephone</label>
                <input value={telephone} type="tel" id="telephone" name="telephone" onChange={(e) => setTelephone(e.target.value)}/>  
              </li>

              {userInfo.admin && (
                <>
                  <li>
              <label htmlFor="position">Position</label>
              <select style={{padding:"5px",margin:"2px"}} id="position" value={position} onChange={(e) => {setPosition(e.target.value)}}>
                       {positions.map(pos=><option key={pos} value={pos}>{pos}</option>)}
              </select>
              </li>

              <li>
              <label htmlFor="work">Work</label>
              <select style={{padding:"5px",margin:"2px"}} id="work" value={work} onChange={(e) => {setWork(e.target.value)}}>
                       {works.map(wor=><option key={wor} value={wor}>{wor}</option>)}
              </select>
              </li>
                
              <li>
              <label  htmlFor="departement">Departement</label>
              <select style={{padding:"5px",margin:"2px"}} id="departement" value={departement} onChange={(e) => {setDepartement(e.target.value)}}>
                       {departements.map(depart=><option key={depart} value={depart}>{depart}</option>)}
              </select>
              </li>
                </>
              )}
              
              
              <li>
                <button type="submit" className="button primary">Update</button>
              </li>
              <li>
                <label htmlFor="password">old Password</label>
                  <input value={password} type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
              </li>

              
        <li>
            <label htmlFor="newpassword">new Password</label>
            <input value={newpassword} type="password" id="newpassword" name="newpassword" onChange={(e) => setNewpassword(e.target.value)}/>
        </li>
        <li>
            <button type="button" onClick={submitHandlerpassword}  className="button primary">Update Password</button>
        </li>
        <li>
            <button type="button" onClick={handleLogout} className="button secondary full-width">Logout</button>
        </li>
            </ul>          
          </form>          
        </div>
      </div>  
    </div>
  </>  
  )
}
export default ProfileScreen