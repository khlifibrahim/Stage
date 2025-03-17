import { 
    FETCH_POINTVENTE_ID_REQUEST,
    FETCH_POINTVENTE_ID_SUCCESS,
    FETCH_POINTVENTE_ID_FAILURE,
    FETCH_POINTVENTES_REQUEST,
    FETCH_POINTVENTES_SUCCESS,
    FETCH_POINTVENTES_FAILURE,
    ADD_POINTVENTE_REQUEST,
    ADD_POINTVENTE_SUCCESS,
    ADD_POINTVENTE_FAILURE,
    UPDATE_POINTVENTE_REQUEST,
    UPDATE_POINTVENTE_SUCCESS,
    UPDATE_POINTVENTE_FAILURE
    } from '../Actions/Types.actions';

const initialState = {
    pointVentes: [],
    pointVente: {},
    loading: false,
    error: null
};

function pointVenteReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_POINTVENTE_ID_REQUEST:
        case FETCH_POINTVENTES_REQUEST:
        case ADD_POINTVENTE_REQUEST:
        case UPDATE_POINTVENTE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        
            
        case FETCH_POINTVENTE_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                pointVente: action.payload || {}
            }
        case FETCH_POINTVENTES_SUCCESS:
            return {
                ...state,
                loading: false,
                pointVentes: action.payload || []
            }
        case ADD_POINTVENTE_SUCCESS:
            return {
                ...state,
                pointVentes: [
                    ...state.pointVentes,
                    action.payload
                ]
            }
        case UPDATE_POINTVENTE_SUCCESS:
            return {
                ...state,
                loading: false,
                pointVentes: state.pointVentes.map(ent => {
                    ent.ICE === action.payload.id_point_vente ? action.payload : ent
                } )
            }

        
        case FETCH_POINTVENTE_ID_FAILURE:
        case FETCH_POINTVENTES_FAILURE:
        case ADD_POINTVENTE_FAILURE:
        case UPDATE_POINTVENTE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
    
        default:
            return state;
    }
}

export default pointVenteReducer;