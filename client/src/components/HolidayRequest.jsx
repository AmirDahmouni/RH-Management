import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLazyQuery,useMutation,useQuery } from 'react-apollo';
import {HOLIDAYS_LIST_SUCCESS,HOLIDAY_ADDED,HOLIDAY_DELETED,HOLIDAY_MODIFIED} from "../constants/holidayConstants"
import moment  from 'moment-timezone';
import DateFormat from "../utils/date"
import {MY_HOLIDAYS_LIST,HOLIDAY_REQUEST,HOLIDAY_DELETE,HOLIDAY_EXTEND} from "../queries/Holidays_Queries"

export default function HolidayRequestScreen()
{
    const dispatch = useDispatch();
    const [modalVisible,setModalVisible]=useState(false)
    const [id,setId]=useState();
    const [type,setType]=useState("annual")
    const [types,setTypes]=useState(["annual","accident"])
    const [start,setStart]=useState()
    const [end,setEnd]=useState()

    const holidaysList=useSelector(state=>state.holidaysList);
    const {holidays}=holidaysList
    
   
    const {loading,data,error}=useQuery(MY_HOLIDAYS_LIST,{
        onError:err=>console.log(err),
        onCompleted:(data)=>{
            if(data.MyHolidays!==null)
            dispatch({type:HOLIDAYS_LIST_SUCCESS,payload:data.MyHolidays})
        },
        fetchPolicy:"network-only"
    })

    
    const [Request]=useMutation(HOLIDAY_REQUEST,{variables:{start,end,type},
    onCompleted:(response)=>{
        if(response.holidayRequest!==null)
          dispatch({ type: HOLIDAY_ADDED, payload: response.holidayRequest});
    }
    })

    
    const [Delete]=useMutation(HOLIDAY_DELETE,{
      onCompleted:(data)=>{
        if(data.deleteHoliday.state=="in process")
        dispatch({type:HOLIDAY_DELETED,payload:data.deleteHoliday._id})
        else if(data.deleteHoliday.state=="in process (extend)")
        dispatch({type:HOLIDAY_MODIFIED,
          payload:{id:data.deleteHoliday._id,end:data.deleteHoliday.end,state:data.deleteHoliday.state}
         })
      }
    })
    const Cancel=(holiday)=>{
       Delete({variables:{id:holiday._id}})
    }

    //extend holiday  
    const [Extend]=useMutation(HOLIDAY_EXTEND,{
      onCompleted:(response)=>{
        if(response.holidayRequest!==null)
          dispatch({ type: HOLIDAY_ADDED, payload: response.holidayRequest});
      }
    })

    const openModal = (holiday) => {
        if(holiday._id)
        {
          setId(holiday._id)
          setModalVisible(true);
          setType(holiday.type)
          setStart(moment(holiday.end).utc().format('YYYY-MM-DD'))
          setEnd(moment(holiday.end).utc().format('YYYY-MM-DD'))
        }
        else  {
            setId()
            setModalVisible(true);
            setStart("jj/mm/aaaa")
            setEnd("jj/mm/aaaa")
        }        
            
    };

    const submitHandler =(e) => {
        e.preventDefault();
        if(id)  Extend({variables:{start,end,type}})
        else Request()
    };

    return (
        <>
        <div className="content content-margined">
             <button className="button primary" onClick={() => openModal({})}>Request</button>
        {modalVisible && (
            <div className="form">
                <form onSubmit={submitHandler}>
                <ul className="form-container">
             <li>
               <h2>{id ? "extend ":"Request " }Holiday</h2>
             </li>     
             
             {!id && (
               <>
              <li>
              <label htmlFor="type">Type</label>
              <select id="type" style={{padding:"5px",margin:"2px"}} value={type} onChange={(e) => {setType(e.target.value)}}>
                       {types.map(type=><option key={type} value={type}>{type}</option>)}
              </select>
             </li>

             <li>
              <label htmlFor="start">Start</label>
              <input id="start" type="date" value={start} onChange={(e)=>setStart(e.target.value)}/>
             </li>
             </>
             ) }
             

             <li>
              <label htmlFor="end">End</label>
              <input id="end" type="date" value={end} onChange={(e)=>setEnd(e.target.value)}/>
             </li>

             <li>
               <button type="submit" className="button primary">
                 {id ? 'Extend' : 'Request'}
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
    <div className="product-header">
            <h3>Holidays</h3>
            
               {loading && <div>Loading...</div>}
               {error && <div>{error}</div>}
  
     </div>
      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
            <th>start</th>
            <th>end</th>
            <th>state</th>
            <th>type</th>
            <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {holidays && holidays.map((holiday) => (
              <tr key={holiday._id}>
                <DateFormat date={holiday.start} />
                <DateFormat date={holiday.end} /> 
                <td>{holiday.state}</td>
                <td>{holiday.type}</td>
                <td>
                {holiday.state=="accepted" && (<button style={{margin:"5px"}} className="button" onClick={() => openModal(holiday)}>extend</button>) }
                {(holiday.state=="in process" || holiday.state=="in process (extend)" ) && (<button style={{margin:"5px"}} className="button" onClick={() => Cancel(holiday)}>cancel</button>)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
      </>)

}