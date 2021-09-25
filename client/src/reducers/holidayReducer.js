
import {HOLIDAYS_LIST_SUCCESS,HOLIDAY_ACCEPTED,HOLIDAY_REFUSED,HOLIDAY_ADDED,HOLIDAY_DELETED,
  HOLIDAY_MODIFIED} from "../constants/holidayConstants"

function holidayListReducer(state={},action){
    switch(action.type)
    {
      case HOLIDAYS_LIST_SUCCESS:
        return {holidays:action.payload};
      case HOLIDAY_MODIFIED:
      {
        let holidaymo=state.holidays.map(holiday=> holiday._id==action.payload.id ? 
           {...holiday,end:action.payload.end,state:action.payload.state}: holiday)
        return {holidays:holidaymo}
      }
      case HOLIDAY_ADDED:
        return {holidays:[...state.holidays,action.payload]}
      case HOLIDAY_DELETED:
        return {holidays:state.holidays.filter(holiday=>holiday._id!=action.payload)}
      case HOLIDAY_ACCEPTED:
        return {holidays:state.holidays.filter(holiday=>holiday._id!=action.payload)}
      case HOLIDAY_REFUSED:
        return {holidays:state.holidays.filter(holiday=>holiday._id!=action.payload)}
      default: return state;
    }
   }
export {holidayListReducer}