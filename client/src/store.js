import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {userSigninReducer,userListReducer} from './reducers/userReducers';
import { holidayListReducer } from './reducers/holidayReducer';
import Cookie from 'js-cookie';


const userInfo = Cookie.get('userInfo') ? JSON.parse(Cookie.get('userInfo')) :null;



const initialState = {
  userSignin: { userInfo }
};



const reducer = combineReducers({
    userSignin: userSigninReducer,
    usersList:userListReducer,
    holidaysList:holidayListReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)));

export default store;