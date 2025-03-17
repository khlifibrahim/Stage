import { 
    FETCH_INDH_ID_REQUEST,
    FETCH_INDH_ID_SUCCESS,
    FETCH_INDH_ID_FAILURE,
    FETCH_INDHS_REQUEST,
    FETCH_INDHS_SUCCESS,
    FETCH_INDHS_FAILURE,
    SEARCH_INDH_REQUEST,
    SEARCH_INDH_SUCCESS,
    SEARCH_INDH_FAILURE,
    ADD_INDH_REQUEST,
    ADD_INDH_SUCCESS,
    ADD_INDH_FAILURE,
    UPDATE_INDH_REQUEST,
    UPDATE_INDH_SUCCESS,
    UPDATE_INDH_FAILURE,
    DELETE_INDH_REQUEST,
    DELETE_INDH_SUCCESS,
    DELETE_INDH_FAILURE,
    FETCH_INDH_HISTORIQUE_SUCCESS,
    FETCH_INDH_HISTORIQUE_REQUEST,
    FETCH_INDH_HISTORIQUE_FAILURE,
    UPDATE_INDH_OBSERVATION_REQUEST,
    UPDATE_INDH_OBSERVATION_SUCCESS,
    UPDATE_INDH_OBSERVATION_FAILURE
    } from '../Actions/Types.actions';

const initialState = {
    indhs: [],
    indh: {},
    historique: [],
    loading: false,
    error: null
};

function indhReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_INDH_ID_REQUEST:
        case FETCH_INDHS_REQUEST:
        case SEARCH_INDH_REQUEST:
        case ADD_INDH_REQUEST:
        case UPDATE_INDH_REQUEST:
        case DELETE_INDH_REQUEST:
        case FETCH_INDH_HISTORIQUE_REQUEST:
        case UPDATE_INDH_OBSERVATION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        
            
        case FETCH_INDH_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                indh: action.payload.indh,
                historique: action.payload.historique
            }
        
        case FETCH_INDHS_SUCCESS:
        case SEARCH_INDH_SUCCESS:
            return {
                ...state,
                loading: false,
                indhs: action.payload
            }
        
        case ADD_INDH_SUCCESS:
            return {
                ...state,
                loading: false,
                indhs: [...state.indhs, action.payload]
            }
        
        case UPDATE_INDH_SUCCESS:
            return {
                ...state,
                loading: false,
                indhs: state.indhs.map(indh => indh.id === action.payload.id ? action.payload : indh),
                indh: state.indh.id === action.payload.id ? action.payload : state.indh
            }
        
        case DELETE_INDH_SUCCESS:
            return {
                ...state,
                loading: false,
                indhs: state.indhs.filter(indh => indh.id !== action.payload)
            }
        
        case FETCH_INDH_HISTORIQUE_SUCCESS:
            return {
                ...state,
                loading: false,
                historique: action.payload
            }
        
        case UPDATE_INDH_OBSERVATION_SUCCESS:
            return {
                ...state,
                loading: false,
                historique: state.historique.map(item => 
                    item.id === action.payload.id ? action.payload : item
                )
            }
        
        case FETCH_INDH_ID_FAILURE:
        case FETCH_INDHS_FAILURE:
        case SEARCH_INDH_FAILURE:
        case ADD_INDH_FAILURE:
        case UPDATE_INDH_FAILURE:
        case DELETE_INDH_FAILURE:
        case FETCH_INDH_HISTORIQUE_FAILURE:
        case UPDATE_INDH_OBSERVATION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        
        default:
            return state;
    }
}

export default indhReducer;
