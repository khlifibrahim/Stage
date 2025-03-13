import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './Reducers/auth.reducer.jsx'
import orderMissionReducer from './Reducers/orderMission.reducer.jsx'
import enterpriseReducer from './Reducers/enterprise.reducer.jsx'
import control31Reducer from "./Reducers/control31.reducer.jsx";
import control24Reducer from './Reducers/control24.reducer.jsx'

const rootReducer = combineReducers({
    auth: authReducer,
    orderMission: orderMissionReducer,
    enterprise: enterpriseReducer,
    control31: control31Reducer,
    control24: control24Reducer
});

const initialState = {};
const middleware = [thunk];
const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
);

export default store;