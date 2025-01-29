import {
    GET_MISSIONS_LIST_REQUEST,
    GET_MISSIONS_LIST_SUCCESS,
    GET_MISSIONS_LIST_FAILED,
    SET_CURRENT_PAGE,
    GET_CADRES_REQUEST,
    GET_CADRES_SUCCESS,
    GET_CADRES_FAILED,
    GET_CARS_REQUEST,
    GET_CARS_SUCCESS,
    GET_CARS_FAILED
} from './Types.actions'

const initialState = {
    missionsList: [],
    loading: false,
    error: null,
    currentPage: 1,
    itemsPerPage: 4,
    totalPage: 0,
}


const MissionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MISSIONS_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        
        case GET_MISSIONS_LIST_SUCCESS:
            return {
                ...state,
                payload: {
                    loading: false,
                    error: null,
                    missionsList: action.payload.missions,
                    totalPage: Math.ceil(action.payload.missions / state.itemsPerPage)
                }
            }
        
        case GET_MISSIONS_LIST_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
                missionsList: []
            }
        
        case SET_CURRENT_PAGE:
        return {
            ...state,
            currentPage: action.payload
        }
    
        default:
            return state;
    }
}

export default MissionsReducer;