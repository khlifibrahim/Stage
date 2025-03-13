import {
    FETCH_CONTROLS_24_REQUEST,
    FETCH_CONTROLS_24_SUCCESS,
    FETCH_CONTROLS_24_FAILURE,
    FETCH_CONTROL_24_BY_ID_REQUEST,
    FETCH_CONTROL_24_BY_ID_SUCCESS,
    FETCH_CONTROL_24_BY_ID_FAILURE,
    CREATE_CONTROL_24_REQUEST,
    CREATE_CONTROL_24_SUCCESS,
    CREATE_CONTROL_24_FAILURE,
    UPDATE_CONTROL_24_REQUEST,
    UPDATE_CONTROL_24_SUCCESS,
    UPDATE_CONTROL_24_FAILURE,
    DELETE_CONTROL_24_REQUEST,
    DELETE_CONTROL_24_SUCCESS,
    DELETE_CONTROL_24_FAILURE
} from '../Actions/Types.actions';

const initialState = {
    controls_24: [],
    control_24: null, 
    loading24: false,
    error24: null
};

function control24Reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CONTROLS_24_REQUEST:
        case FETCH_CONTROL_24_BY_ID_REQUEST:
        case CREATE_CONTROL_24_REQUEST:
        case UPDATE_CONTROL_24_REQUEST:
        case DELETE_CONTROL_24_REQUEST:
            return { ...state, loading24: true };

        case FETCH_CONTROLS_24_SUCCESS:
            return { ...state, loading24: false, controls_24: action.payload, error24: null };

        case FETCH_CONTROL_24_BY_ID_SUCCESS:
            return { ...state, loading24: false, control_24: action.payload, error24: null };

        case CREATE_CONTROL_24_SUCCESS:
            return { ...state, loading24: false, controls_24: [...state.controls_24, action.payload], error24: null };

        case UPDATE_CONTROL_24_SUCCESS:
            return {
                ...state,
                loading24: false,
                controls_24: state.controls_24.map(control =>
                    control.id === action.payload.id ? action.payload : control
                ),
                error24: null
            };

        case DELETE_CONTROL_24_SUCCESS:
            return {
                ...state,
                loading24: false,
                controls_24: state.controls_24.filter(control => control.id !== action.payload),
                error24: null
            };

        case FETCH_CONTROLS_24_FAILURE:
        case FETCH_CONTROL_24_BY_ID_FAILURE:
        case CREATE_CONTROL_24_FAILURE:
        case UPDATE_CONTROL_24_FAILURE:
        case DELETE_CONTROL_24_FAILURE:
            return { ...state, loading24: false, error24: action.payload };

        default:
            return state;
    }
}

export default control24Reducer;
