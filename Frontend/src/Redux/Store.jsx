import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './Reducers/auth.reducer.jsx'

const rootReducer = combineReducers({
    auth: authReducer
});

const initialState = {};
const middleware = [thunk];
// const middleware = {thunk};
const composerEnhancer = 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
    // composeWithDevTools(applyMiddleware(...middleware)),
    
);

export default store;