import {
    CREATE_CONTROL_REQUEST,
    CREATE_CONTROL_SUCCESS,
    CREATE_CONTROL_FAILURE,
    UPDATE_CONTROL_REQUEST,
    UPDATE_CONTROL_SUCCESS,
    UPDATE_CONTROL_FAILURE,
    DELETE_CONTROL_REQUEST,
    DELETE_CONTROL_SUCCESS,
    DELETE_CONTROL_FAILURE,
    SET_EXECUTED_AT
} from '../Actions/Types.actions';

const initalState = {
    control : {
        entID: "",
        pratics: [
            {name: "Affichage des prix", status: "conform", observation: ''},
            {name: "Etiquetage", status: "conform", observation: ''},
            {name: "Publicite", status: "conform", observation: ''},
            {name: "Garantie", status: "conform", observation: ''},
            {name: "Solde", status: "conform", observation: ''},
            {name: "Facture", status: "conform", observation: ''}
        ],
        executedAt: {executed: false, at: ''},
        edited: ""
    },
    loading: false,
    error: null
}

function controlReducer(state = initalState, action) {
    switch (action.type) {
        case CREATE_CONTROL_REQUEST:
        case UPDATE_CONTROL_REQUEST:
        case DELETE_CONTROL_REQUEST:
            return {
                ...state,
                loading: true
            };
        
        case CREATE_CONTROL_SUCCESS:
            return {
                ...state,
                loading: false,
                control: action.payload,
                error: null
            };
        case UPDATE_CONTROL_SUCCESS:
            return {
                ...state,
                loading: false,
                control: action.payload,
                error: null
            };
        case DELETE_CONTROL_SUCCESS:
            return {
                ...state,
                loading: false,
                control: {
                    ...state.control,
                    entID: '',
                    pratics: [] 
                },
                error: null
            };
        
        case CREATE_CONTROL_FAILURE:
        case UPDATE_CONTROL_FAILURE:
        case DELETE_CONTROL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case SET_EXECUTED_AT:
            return {
                ...state.control,
                executedAt: action.payload
            }
    
        default:
            return state;
    }
}

export default controlReducer;