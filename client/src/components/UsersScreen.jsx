import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import gql from "graphql-tag";
import { useLazyQuery,useMutation,useQuery } from 'react-apollo';
import { USERS_LIST_SUCCESS,USER_LIST_UPDATE_SUCCESS,USER_LIST_UPDATE_FAIL,USER_ADDED_SUCCESS,
  USER_ADDED_FAIL,USER_DELETED} from '../constants/userConstants';
import connected from "../icons/connected.png"
import disconnected from "../icons/disconnected.jpg"
import ReactRoundedImage from "react-rounded-image";
import DateFormat from "../utils/date"
import {USERS_LIST,USER_UPDATE_BYID,USER_REGISTER,USER_DELETE} from "../queries/Users_Queries"
import {UPLOAD_IMG,AVATAR_DELETE} from "../queries/Files_Queries"



export default function UsersScreen()
{
  

    const [modalVisible, setModalVisible] = useState(false);
    const [holidays,setHolidays]=useState([])
    const [name,setName]=useState()
    const [surname,setSurname]=useState()
    const [username,setUsername]=useState()
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const [repassword,setRepassword]=useState()
    const [telephone,setTelephone]=useState()
    const [avatar,setAvatar]=useState(null)

    const [departements,setDepartements]=useState( ["MOBILE","WEB","CLOUD","UI/UX","BI","DEVOPS","IOT"])
    const [departement,setDepartement]=useState("MOBILE")

    const [positions,setPositions]=useState(["developper","project manager","network administrator"," systems engineering manager","business analyst"]);
    const [position,setPosition]=useState("developper")

    const [works,setWorks]=useState(["full remote","remote","office"])
    const [work,setWork]=useState("full remote")

    const [id,setId]=useState();
    const dispatch = useDispatch();
     
   
        
    const {loading,data,error,refetch}=useQuery(USERS_LIST,
    {
        onError:err=>console.log(err),
        onCompleted:(data)=>{
            if(data.getUsers!==null)
            dispatch({type:USERS_LIST_SUCCESS,payload:data.getUsers})
        },
        fetchPolicy:"network-only"
    })

    
    const [uploadImg]=useMutation(UPLOAD_IMG,{
      onError:(err)=>console.log(err),
      onCompleted:(response)=>{
        if(response.uploadImage.error===null)
        setAvatar(response.uploadImage.path.substr(1,response.uploadImage.path.length))
        else console.log(response.uploadImage.error)
      }
    })

    const onChange = ({target: {validity,files: [file]}}) =>{
      validity.valid && uploadImg({ variables: { file } });
    } 

     //update user
    
    const [updateUser]=useMutation(USER_UPDATE_BYID,{variables:{
    id,
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
    onCompleted:(response)=>{
    if(response.updateUserById!=null)
        dispatch({ type: USER_LIST_UPDATE_SUCCESS, payload:{user:response.updateUserById,
           id:response.updateUserById._id}})
    else
        dispatch({ type: USER_LIST_UPDATE_FAIL, payload:"error updating user" });
    },
    
    });

    
    const [createUser]=useMutation(USER_REGISTER,{
      variables:{
          surname,
          username,
          name,
          email,
          password,
          telephone,
          avatar,
          position,
          departement,
          work
         },
         onError:err=>console.log(err.message),
         onCompleted:(response)=>{
           
          if(response.addUser!==null)
          {
            dispatch({ type: USER_ADDED_SUCCESS, payload: response.addUser});
          }
          else
            dispatch({ type: USER_ADDED_FAIL, payload:"error creating user"});
         }   
    })
    
    const [deleteUser]=useMutation(USER_DELETE)
    const [deleteAvatar]=useMutation(AVATAR_DELETE)

    const deleteHandler = (user) => {
      setId("")
      setModalVisible(false);
      openModal(false)
      setName("")
      setSurname("")
      setPassword("")
      setRepassword("")
      setUsername("")
      setEmail("")
      setTelephone("")
      
      deleteUser({variables:{userid:user._id}})
      deleteAvatar({variables:{path:user.avatar}})
      dispatch({type:USER_DELETED,payload:user._id})
        
    };

    const usersList=useSelector(state=>state.usersList);
    const {users}=usersList
    
    
    const openModal = (user) => {
        if(user._id)
        {
          setId(user._id)
          setModalVisible(true);
          setName(user.name)
          setSurname(user.surname)
          setUsername(user.username)
          setEmail(user.email)
          setDepartement(user.departement)
          setPosition(user.position)
          setWork(user.work)
          setTelephone(user.telephone)
          setAvatar(null)
          
        }
        else{
            setId("")
            setModalVisible(true);
            setName("")
            setSurname("")
            setPassword("")
            setRepassword("")
            setUsername("")
            setEmail("")
            setTelephone("")
        } 
    };

    const submitHandler =(e) => {
        e.preventDefault();
        if(id) {
          if (avatar!==null)
          { deleteAvatar({variables:{path:users.find(user=>user._id==id).avatar}}); setAvatar(null) }
         updateUser()
        }  
        else 
          if(password===repassword) createUser() 
    };
      
     return (
     <div className="content content-margined">
         <button className="button primary" onClick={() => openModal({})}>Create User</button>
     {modalVisible && (
       <div className="form">
         <form onSubmit={submitHandler}>
           <ul className="form-container">
             <li>
               <h2>Create User</h2>
             </li>     
             <li>
               {loading && <div>Loading...</div>}
               {error && <div>{error}</div>}
             </li>
             <input type="file" onChange={onChange} />
             <li>
               <label htmlFor="name">Name</label>
               <input
                 type="text"
                 name="name"
                 value={name}
                 id="name"
                 onChange={(e) => setName(e.target.value)}
               ></input>
             </li>
             <li>
               <label htmlFor="surname">SurName</label>
               <input
                 type="text"
                 name="surname"
                 value={surname}
                 id="surname"
                 onChange={(e) => setSurname(e.target.value)}
               ></input>
             </li>
             <li>
               <label htmlFor="username">Username</label>
               <input
                 type="text"
                 name="username"
                 value={username}
                 id="username"
                 onChange={(e) => setUsername(e.target.value)}
               ></input>
             </li>
             <li>
               <label htmlFor="email">Email</label>
               <input
                 type="text"
                 name="Email"
                 value={email}
                 id="email"
                 onChange={(e) => setEmail(e.target.value)}
               ></input>
             </li>
             {!id && (<> <li>
               <label htmlFor="password">Password</label>
               <input
                 type="password"
                 name="password"
                 value={password}
                 id="password"
                 onChange={(e) => setPassword(e.target.value)}
               ></input>
             </li>

            <li>
              <label htmlFor="repassword">rePassword</label>
              <input type="password" name="repassword" 
                    value={repassword} id="repassword" onChange={(e) => setRepassword(e.target.value)} ></input>
            </li>
            </>   
             )}
            

             <li>
               <label htmlFor="telephone">Telephone</label>
               <input
                 type="text"
                 name="telephone"
                 value={telephone}
                 id="telephone"
                 onChange={(e) => setTelephone(e.target.value)}
               ></input>
             </li>

             <li>
              <label htmlFor="departement">Departement</label>
              <select style={{padding:"5px",margin:"2px"}} id="departement" value={departement} onChange={(e) => {setDepartement(e.target.value)}}>
                       {departements.map(depart=><option key={depart} value={depart}>{depart}</option>)}
              </select>
             </li>
           
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
               <button type="submit" className="button primary">
                 {id ? 'Update' : 'Create'}
               </button>
             </li>
             <li>
               <button
                 type="button"
                 onClick={() => setModalVisible(false)}
                 className="button secondary"
               >
                 Back
               </button>
             </li>
           </ul>
         </form>
       </div>
     )}
     
      

      { holidays && holidays.length>0 && (
      <div className="product-list">
     <h3>Holidays</h3>
     
     <table className="table">
      <thead>
        <tr>

        <th>start</th>
        <th>end</th>
        <th>state</th>
        <th>type</th>
        </tr>
      </thead>
      <tbody>
      {  
         holidays.map(holiday=>
          <tr>
          <DateFormat date={holiday.start} />
          <DateFormat date={holiday.end} />
          <td>{holiday.state}</td>
          <td>{holiday.type}</td>
        </tr> 
         )
      }
      <button className="button primary" onClick={() => setHolidays(null)} style={{margin:"10px"}}>Back</button>
      </tbody>
      </table>
    </div>
      )}


     <div className="product-header">
            <h3>employers</h3>
     </div>
      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Username</th>
              <th>Name</th>
              <th>Telephone</th>
              <th>Departement</th>
              <th>Position</th>
              <th>Work</th>
              <th>Holiday</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((user) => (
              <tr key={user._id}>
                <td><ReactRoundedImage image={`${process.env.REACT_APP_IP}${user.avatar}`} borderRadius="50"
                    imageWidth="70" roundedSize="5"
                    imageHeight="70" hoverColor="#DD1144" /></td>
                <td>{user.username}</td>
                <td>{user.name}</td>
                <td>{user.telephone}</td>
                <td>{user.departement}</td>
                <td>{user.position}</td>
                <td>{user.work}</td>
                
                <td onClick={()=>setHolidays(user.holidays)}><img style={{padding:"10px"}}
                       src={user.holiday ? connected : disconnected}/></td>
                <td>
                  <button style={{margin:"5px"}} className="button" onClick={() => openModal(user)}>Edit</button>
                  <button style={{margin:"5px"}} className="button" onClick={()=>deleteHandler(user)} >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
     )
}