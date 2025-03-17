import Instance from '../../Api/axios';
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
    UPDATE_INDH_OBSERVATION_REQUEST,
    UPDATE_INDH_OBSERVATION_SUCCESS,
    UPDATE_INDH_OBSERVATION_FAILURE
    } from './Types.actions';

export const fetchIndh = () => async (dispatch) => {
    try {
        dispatch({type: FETCH_INDHS_REQUEST})

        const response = await Instance.get('/indh/list');
        dispatch({
            type: FETCH_INDHS_SUCCESS,
            payload: response.data.indhs
        })
    } catch (error) {
        dispatch({
            type: FETCH_INDHS_FAILURE,
            payload: error.response.data.message || 'Error fetching INDH list'
        })
    }
}

export const searchIndh = (searchTerm) => async (dispatch) => {
    try {
        dispatch({type: SEARCH_INDH_REQUEST})

        const response = await Instance.get(`/indh/search?searchTerm=${encodeURIComponent(searchTerm)}`);
        dispatch({
            type: SEARCH_INDH_SUCCESS,
            payload: response.data.indhs
        })
    } catch (error) {
        dispatch({
            type: SEARCH_INDH_FAILURE,
            payload: error.response?.data?.message || 'Error searching INDH projects'
        })
    }
}

export const getIndhById = (id) => async (dispatch) => {
    try {
        dispatch({type: FETCH_INDH_ID_REQUEST})

        const response = await Instance.post('/indh/getIndh', {id})
        dispatch({
            type: FETCH_INDH_ID_SUCCESS,
            payload: {
                indh: response?.data?.indh || {},
                historique: response?.data?.historique || []
            }
        })
    } catch (error) {
        dispatch({
            type: FETCH_INDH_ID_FAILURE,
            payload: error?.response?.data.message || 'Error fetching INDH project'
        })
    }
}

export const addIndh = (data) => async (dispatch) => {
    try {
        dispatch({type: ADD_INDH_REQUEST})

        const response = await Instance.post('/indh/add', data)
        dispatch({
            type: ADD_INDH_SUCCESS,
            payload: response.data.indh
        });
        return true

    } catch (error) {
        dispatch({
            type: ADD_INDH_FAILURE,
            payload: error.response.message || 'Error while adding INDH project'
        });

        return false
    }
}

export const updateIndh = (id, data) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_INDH_REQUEST})

        const response = await Instance.put(`/indh/update/${id}`, data)
        dispatch({
            type: UPDATE_INDH_SUCCESS,
            payload: response.data.indh
        })
        return true;
    } catch (error) {
        dispatch({
            type: UPDATE_INDH_FAILURE,
            payload: error.response.data.message || 'Update INDH project error'
        });
        return false
    }
}

export const deleteIndh = (id) => async (dispatch) => {
    try {
        dispatch({type: DELETE_INDH_REQUEST})

        const response = await Instance.delete(`/indh/delete/${id}`);
        dispatch({
            type: DELETE_INDH_SUCCESS,
            payload: id
        });
        return {success: true, message: response.data.message};
    } catch (error) {
        dispatch({
            type: DELETE_INDH_FAILURE,
            payload: error.response?.data?.message || 'Error deleting INDH project'
        });
        return {success: false, message: error.response?.data?.message || 'Error deleting INDH project'};
    }
}

export const updateObservation = (data) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_INDH_OBSERVATION_REQUEST });

        const response = await Instance.post('/indh/updateObservation', data);
        
        dispatch({
            type: UPDATE_INDH_OBSERVATION_SUCCESS,
            payload: {
                id: data.id,
                observation: data.observation
            }
        });
        
        return { success: true, message: response.data.message };
    } catch (error) {
        dispatch({
            type: UPDATE_INDH_OBSERVATION_FAILURE,
            payload: error.response?.data?.message || 'Error updating observation'
        });
        
        return { 
            success: false, 
            message: error.response?.data?.message || 'Error updating observation'
        };
    }
};
