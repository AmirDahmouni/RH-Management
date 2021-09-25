import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, 
     USER_REGISTER_FAIL,USER_UPDATE_PASSWORD_SUCCESS,USER_UPDATE_PASSWORD_FAIL,
    USER_LOGOUT,USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,USERS_LIST_SUCCESS,
    USER_ADDED_SUCCESS,USER_DELETED,USER_LIST_UPDATE_SUCCESS } from "../constants/userConstants";

function userSigninReducer(state = {}, action) {
 switch (action.type) {
   case USER_SIGNIN_REQUEST:
     return { loading: true };
   case USER_SIGNIN_SUCCESS:
     return { loading: false, userInfo: action.payload };
   case USER_SIGNIN_FAIL:
     return { loading: false, error: action.payload };
   case USER_UPDATE_REQUEST:
     return {...state,loading: true };
   case USER_UPDATE_SUCCESS:
     return { loading: false,message:action.payload.message,userInfo: action.payload };
   case USER_UPDATE_FAIL:
     return {...state,loading: false, error: action.payload };
   case USER_UPDATE_PASSWORD_SUCCESS:
     return {...state,loading:false,error:null,message:action.payload};
   case USER_UPDATE_PASSWORD_FAIL:
     return {...state,message:null,loading:false,error:action.payload}
   case USER_LOGOUT:
     return {};
   default: return state;
 }
}


function userListReducer(state={},action){
 switch(action.type)
 {
   case USERS_LIST_SUCCESS:
     return {users:action.payload};
   case USER_ADDED_SUCCESS:
     return {users:[...state.users,action.payload]}
   case USER_DELETED:
       return {users:state.users.filter(user=>user._id!==action.payload)}
   case USER_LIST_UPDATE_SUCCESS:
   {
     let copyusers=[...state.users]
     let index=copyusers.findIndex(user=>user._id==action.payload.id)
     copyusers.splice(index,1)
     copyusers.push(action.payload.user)
      return {users:[...copyusers]}
   }
   default: return state;
 }
}
export {
 userSigninReducer,userListReducer
}