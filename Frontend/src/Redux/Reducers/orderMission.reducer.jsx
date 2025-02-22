import {
    CREATE_ORDERMISSION_REQUEST,
    CREATE_ORDERMISSION_SUCCESS,
    CREATE_ORDERMISSION_FAILURE,
    UPDATE_ORDERMISSION_REQUEST,
    UPDATE_ORDERMISSION_SUCCESS,
    UPDATE_ORDERMISSION_FAILURE,
    DELETE_ORDERMISSION_REQUEST,
    DELETE_ORDERMISSION_SUCCESS,
    DELETE_ORDERMISSION_FAILURE,
    FETCH_ORDERMISSIONS_REQUEST,
    FETCH_ORDERMISSIONS_SUCCESS,
    FETCH_ORDERMISSIONS_FAILURE
} from '../Actions/Types.actions'

const initialState = {
    orderMissions : [],
    loading: false,
    error: null
}

function orderMissionReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ORDERMISSIONS_REQUEST:
        case CREATE_ORDERMISSION_REQUEST:
        case UPDATE_ORDERMISSION_REQUEST:
        case DELETE_ORDERMISSION_REQUEST:
            return {
                ...state,
                loading :true,
                error: null
            }
        
        case FETCH_ORDERMISSIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                orderMissions: action.payload
            }
        case CREATE_ORDERMISSION_SUCCESS:
            return {
                ...state,
                orderMissions: [
                    ...state.orderMissions,
                    action.payload
                ]
            }
        case UPDATE_ORDERMISSION_SUCCESS:
            return {
                ...state,
                orderMissions: state.orderMissions.map(om => {
                    om.missionId === action.payload.missionId ? action.payload : om
                }),
            }
        case DELETE_ORDERMISSION_SUCCESS:
            return {
                ...state,
                orderMissions: state.orderMissions.filter(om => {
                    om.missionId !== action.payload
                })
            }

        case CREATE_ORDERMISSION_FAILURE:
        case UPDATE_ORDERMISSION_FAILURE:
        case DELETE_ORDERMISSION_FAILURE:
        case FETCH_ORDERMISSIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
    
        default:
            return state
    }
}

export default orderMissionReducer;