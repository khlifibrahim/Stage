import Instance from '../../Api/axios';
import {
    FETCH_CONTROLS_24_REQUEST,
    FETCH_CONTROLS_24_SUCCESS,
    FETCH_CONTROLS_24_FAILURE,
    CREATE_CONTROL_24_REQUEST,
    CREATE_CONTROL_24_SUCCESS,
    CREATE_CONTROL_24_FAILURE,
    UPDATE_CONTROL_24_REQUEST,
    UPDATE_CONTROL_24_SUCCESS,
    UPDATE_CONTROL_24_FAILURE,
    DELETE_CONTROL_24_REQUEST,
    DELETE_CONTROL_24_SUCCESS,
    DELETE_CONTROL_24_FAILURE,
    FETCH_CONTROL_24_BY_ID_REQUEST,
    FETCH_CONTROL_24_BY_ID_SUCCESS,
    FETCH_CONTROL_24_BY_ID_FAILURE
} from './Types.actions';

export const fetchControls24 = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_CONTROLS_24_REQUEST });
        const response = await Instance.get('/control/24/list');
        dispatch({
            type: FETCH_CONTROLS_24_SUCCESS,
            payload: response.data.controls24 || []
        });
    } catch (error) {
        dispatch({
            type: FETCH_CONTROLS_24_FAILURE,
            payload: error.response?.data.message || 'Erreur lors du chargement des contrôles 24'
        });
        throw error;
    }
};

export const fetchControlById24 = (id) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_CONTROL_24_BY_ID_REQUEST });
        const response = await Instance.get(`/control/24/${id}`);
        dispatch({
            type: FETCH_CONTROL_24_BY_ID_SUCCESS,
            payload: response.data.control24
        });
    } catch (error) {
        dispatch({
            type: FETCH_CONTROL_24_BY_ID_FAILURE,
            payload: error.response?.data.message || 'Erreur lors du chargement du contrôle'
        });
    }
};

export const createControl24 = (data) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_CONTROL_24_REQUEST });
        const response = await Instance.post('/control/24/add', data);
        dispatch({
            type: CREATE_CONTROL_24_SUCCESS,
            payload: response.data.control24
        });
        return true;
    } catch (error) {
        dispatch({
            type: CREATE_CONTROL_24_FAILURE,
            payload: error.response?.data.message || 'Impossible de créer ce contrôle 24'
        });
        return false;
    }
};

export const updateControl24 = (id, data) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_CONTROL_24_REQUEST });
        const response = await Instance.put(`/control/24/update/${id}`, data);
        dispatch({
            type: UPDATE_CONTROL_24_SUCCESS,
            payload: response.data.control24
        });
        return true;
    } catch (error) {
        dispatch({
            type: UPDATE_CONTROL_24_FAILURE,
            payload: error.response?.data.message || 'Erreur lors de la mise à jour du contrôle Local'
        });
        return false;
    }
};

export const deleteControl24 = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_CONTROL_24_REQUEST });
        await Instance.delete(`/control/24/delete/${id}`);
        dispatch({
            type: DELETE_CONTROL_24_SUCCESS,
            payload: id
        });
        return true;
    } catch (error) {
        dispatch({
            type: DELETE_CONTROL_24_FAILURE,
            payload: error.response?.data.message || 'Erreur lors de la suppression du contrôle Local'
        });
        return false;
    }
};