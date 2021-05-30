import { combineReducers } from "redux";
import { authReducer } from './auth-reducer';
import { weatherReducer } from './weather-reducer';

const RootReducer = combineReducers({
    authReducer,
    weatherReducer
});
  
export default RootReducer;
  