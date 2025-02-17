import { 
    SET_ENTERPRISE_DETAILS,
    SUBMIT_ENTERPRISE_REQUEST, 
    SUBMIT_ENTERPRISE_SUCCESS, 
    SUBMIT_ENTERPRISE_FAILURE
    } from '../Actions/Types.actions';

const initialState = {
    enterpriseDetails: {},
    loading: false,
    error: null
};

function enterpriseReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ENTERPRISE_DETAILS:
            return  {
                ...state,
                enterpriseDetails: action.payload,
            }

        case SUBMIT_ENTERPRISE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case SUBMIT_ENTERPRISE_SUCCESS:
            return {
                ...state,
                loading: false,
                enterpriseDetails: {}
            }
        case SUBMIT_ENTERPRISE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
    
        default:
            return state;
    }
}

export default enterpriseReducer;