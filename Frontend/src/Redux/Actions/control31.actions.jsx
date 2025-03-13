import Instance from '../../Api/axios';
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
    DELETE_CONTROL_31_FAILURE,
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
    DELETE_CONTROL_24_FAILURE
} from './Types.actions';

export const fetchControls31 = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_CONTROLS_31_REQUEST })
        dispatch({ type: FETCH_CONTROLS_24_REQUEST })

        const response = await Instance.get('/control/list');
        dispatch({
            type: FETCH_CONTROLS_31_SUCCESS,
            payload: response.data.controls
        });
    } catch (error) {
        dispatch({
            type: FETCH_CONTROLS_31_FAILURE,
            payload: error.response?.data.message || 'Erreur lors du chargement des contrôles'
        });
        throw error
    }
}

export const createControl = (data) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_CONTROL_31_REQUEST})

        const response = await Instance.post('/control/add', data);
        dispatch({
            type: CREATE_CONTROL_31_SUCCESS,
            payload: response.data.control
        })

        return true
    } catch (error) {
        dispatch({
            type: CREATE_CONTROL_31_FAILURE,
            payload: error.response?.data.message || 'On peu pas créé ce controle'
        })
        return false
    }
}
export const createControl24 = (data) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_CONTROL_24_REQUEST})
        const response = await Instance.post('/control/24/add')
        dispatch({
            type: CREATE_CONTROL_24_SUCCESS,
            payload: response.data.control24
        })

    }catch (error) {

    }
}

export const updateControl = (id, data) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_CONTROL_31_REQUEST })

        const response = await Instance.put(`/control/update/${id}`, data)
        dispatch({
            type: UPDATE_CONTROL_31_SUCCESS,
            payload: response.data.control
        })
        
        return true
    } catch (error) {
        dispatch({
            type: UPDATE_CONTROL_31_FAILURE,
            payload: error.response?.data.message || 'Erreur lors de la mise à jour du contrôle'
        })
        return false
    }
}

export const deleteControl = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_CONTROL_31_REQUEST})

        const response = await Instance.delete(`/control/delete/${id}`)
        dispatch({
            type: DELETE_CONTROL_31_SUCCESS,
            payload: id
        })
        
        return true
    } catch (error) {
        dispatch({
            type: DELETE_CONTROL_31_FAILURE,
            payload: error.response?.data.message || 'Erreur lors de la suppression du contrôle'
        })
        return false
    }
}