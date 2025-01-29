import { LOGINFAILED, LOGINREQUEST, LOGINSUCCESS, LOGOUT } from "../Actions/Types.actions";

const initialState = {
    isAuthenticated: false,
    user: null,
    permissions: [],
    token: null,
    role: null,
    loading: false,
    error: null,
};
console.log(initialState)


const authReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case LOGINREQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case LOGINSUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                permissions: action.payload.permissions,
                token: action.payload.token,
                role: action.payload.role,
                loading: false,
                error: null
            };
        
        case LOGINFAILED:
            return {
                ...state,
                user: null,
                token: null,
                role: null,
                loading: false,
                error: action.payload,
            };


        case LOGOUT:
            return {
                ...initialState
            };
    
        default:
            return state;
    }
}

export default authReducer;