import {
    FETCH_CONTROLS_31_REQUEST,
    FETCH_CONTROLS_31_SUCCESS,
    FETCH_CONTROLS_31_FAILURE,
    CREATE_CONTROL_31_REQUEST,
    CREATE_CONTROL_31_SUCCESS,
    CREATE_CONTROL_31_FAILURE,
    UPDATE_CONTROL_31_REQUEST,
    UPDATE_CONTROL_31_SUCCESS,
    UPDATE_CONTROL_31_FAILURE,
    DELETE_CONTROL_31_REQUEST,
    DELETE_CONTROL_31_SUCCESS,
    DELETE_CONTROL_31_FAILURE
} from '../Actions/Types.actions';

const initalState = {
    controls_31 : [],
    loading31: false,
    error31: null
}

function control31Reducer(state = initalState, action) {
    switch (action.type) {
        case FETCH_CONTROLS_31_REQUEST:
        case CREATE_CONTROL_31_REQUEST:
        case UPDATE_CONTROL_31_REQUEST:
        case DELETE_CONTROL_31_REQUEST:
            return {
                ...state,
                loading31: true
            };
        
        
        case FETCH_CONTROLS_31_SUCCESS:
            return {
                ...state,
                loading31: false,
                controls_31:action.payload,
                error31: null,
            }
        case FETCH_CONTROLS_31_SUCCESS:
            return {
                ...state,
                loading31: false,
                controls_24:action.payload,
                error31: null,
            }
        case CREATE_CONTROL_31_SUCCESS:
            return {
                ...state,
                loading31: false,
                controls_31:[...state.controls_31, action.payload],
                error31: null
            };
        case DELETE_CONTROL_31_SUCCESS:
            return {
                ...state,
                loading31: false,
                controls_31 : state.controls_31.filter(control => control.id !== action.payload),
                error31: null
            };
        case UPDATE_CONTROL_31_SUCCESS:
            return {
                ...state,
                loading31: false,
                controls_31: state.controls_31.map(control =>
                    control.id === action.payload.id ? action.payload : control
                ),
                error31: null
            };
        case FETCH_CONTROLS_31_FAILURE:
        case CREATE_CONTROL_31_FAILURE:
        case UPDATE_CONTROL_31_FAILURE:
        case DELETE_CONTROL_31_FAILURE:
            return {
                ...state,
                loading31: false,
                error31: action.payload
            };
    
        default:
            return state;
    }
}

export default control31Reducer;