import gql from "graphql-tag";

export  const MY_HOLIDAYS_LIST=gql`query
{
    MyHolidays{_id start end type state}
}`;


export const HOLIDAY_REQUEST=gql`mutation($start:DateTime!,$end:DateTime!,$type:String!) {
    holidayRequest(holidayInput:{
       start:$start,
       end:$end,
       type:$type,
       state:"in process" 
   })
   { _id start end state type} 
}`;



//delete holiday
export const HOLIDAY_DELETE=gql`mutation ($id:String!){
    deleteHoliday(holidayId:$id)
    {_id start end state type}
}`


//demand holiday
export const HOLIDAY_EXTEND=gql`mutation($start:DateTime!,$end:DateTime!,$type:String!) {
    holidayRequest(holidayInput:{
       start:$start,
       end:$end,
       type:$type,
       state:"in process (extend)" 
   })
   { _id start end state type} 
}`

//accept holiday
export  const ACCEPT_HOLIDAY=gql`
mutation acceptHoliday($id:String!){
    acceptHoliday(holidayId:$id)
    {_id }

}`;

//refuse holiday
export const REFUSE_HOLIDAY=gql`
mutation refusHoliday($id:String!){
  refusHoliday(holidayId:$id)
  {_id}
}`;

export const HOLIDAYS_LIST=gql`query {
    HolidaysRequests {_id start end state type employee {_id avatar username}}
}`;


