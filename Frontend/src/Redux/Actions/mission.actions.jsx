import Instance from '../../Api/axios';
import {
    GET_MISSIONS_LIST_REQUEST,
    GET_MISSIONS_LIST_SUCCESS,
    GET_MISSIONS_LIST_FAILED,
    GET_CADRES_REQUEST,
    GET_CADRES_SUCCESS,
    GET_CADRES_FAILED,
    GET_CARS_REQUEST,
    GET_CARS_SUCCESS,
    GET_CARS_FAILED
} from './Types.actions'

export const ListMissions = () => async (dispatch) => {
try {
    dispatch({ type: GET_MISSIONS_LIST_REQUEST});

    const response = await Instance.get('/missions/getOrderMission');
    dispatch({
        
    })
} catch (error) {
    dispatch({
        type: GET_MISSIONS_LIST_FAILED,
        payload: error.message
    });
    console.log("Error while fetching missions list: ",error);
    throw error
}
}

export const createMission = (missionsData) => (dispatch) => {

}