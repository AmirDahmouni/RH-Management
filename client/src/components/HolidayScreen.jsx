import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLazyQuery,useMutation,useQuery } from 'react-apollo';
import {HOLIDAYS_LIST_SUCCESS,HOLIDAY_ACCEPTED,HOLIDAY_REFUSED} from "../constants/holidayConstants"
import ReactRoundedImage from "react-rounded-image";
import DateFormat from "../utils/date"
import {ACCEPT_HOLIDAY,REFUSE_HOLIDAY,HOLIDAYS_LIST} from "../queries/Holidays_Queries"
export default function HolidayScreen()
{
    const dispatch = useDispatch();
    
    const {loading,data,error}=useQuery(HOLIDAYS_LIST,{
        onError:err=>console.log(err),
        onCompleted:(response)=>{
            console.log(response)
            if(response.HolidaysRequests!==null)
            dispatch({type:HOLIDAYS_LIST_SUCCESS,payload:response.HolidaysRequests})
        },
        fetchPolicy:"network-only"
    })

    const [acceptHoliday]=useMutation(ACCEPT_HOLIDAY) 
    const accept=(id)=>{
        acceptHoliday({variables:{id}})
        dispatch({type:HOLIDAY_ACCEPTED,payload:id})
    }

    const [refusHoliday]=useMutation(REFUSE_HOLIDAY)
    const refuse=(id)=>{
       refusHoliday({variables:{id}})
       dispatch({type:HOLIDAY_REFUSED,payload:id})
    }

    const holidaysList=useSelector(state=>state.holidaysList);
    const {holidays}=holidaysList


    return(
        <>
        <div className="product-header">
            <h3>employers</h3>
     </div>
      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Username</th>
              <th>start</th>
              <th>end</th>
              <th>type</th>
              <th>state</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {holidays && holidays.map((holiday) => (
              <tr key={holiday._id}>
                <td><ReactRoundedImage image={`${process.env.REACT_APP_IP}${holiday.employee.avatar}`} borderRadius="50"
                    imageWidth="70" roundedSize="5"
                    imageHeight="70" hoverColor="#DD1144" /></td>
                <td>{holiday.employee.username}</td>
                <DateFormat date={holiday.start} />
                <DateFormat date={holiday.end} />
                <td>{holiday.type}</td>
                <td>{holiday.state}</td>
                <td>
                  <button style={{margin:"5px"}} className="button" onClick={()=>accept(holiday._id)}>Accept</button>
                  <button style={{margin:"5px"}} className="button" onClick={()=>refuse(holiday._id)}>Refuse</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </>
    )
}