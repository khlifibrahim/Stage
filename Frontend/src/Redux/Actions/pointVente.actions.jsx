import Instance from '../../Api/axios';
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
    } from './Types.actions';

export const fetchPointVente = () => async (dispatch) => {
    try {
        dispatch({type: FETCH_POINTVENTES_REQUEST})

        const response = await Instance.get('/point_vente/list');
        dispatch({
            type: FETCH_POINTVENTES_SUCCESS,
            payload: response.data.pointVentes
        })
    } catch (error) {
        dispatch({
            type: FETCH_POINTVENTES_FAILURE,
            payload: error.response.data.message || 'Error fetching point de vente list'
        })
    }
}

export const getPointVenteById = (id) => async (dispatch) => {
    try {
        dispatch({type: FETCH_POINTVENTE_ID_REQUEST})

        const response = await Instance.post('/point_vente/getPointVente', {id})
        dispatch({
            type: FETCH_POINTVENTE_ID_SUCCESS,
            payload: response?.data?.pointVente
        })
    } catch (error) {
        dispatch({
            type: FETCH_POINTVENTE_ID_FAILURE,
            payload: error?.response?.data.message || 'Error fetching point vente'
        })
    }
}

export const addPointVente = (data) => async (dispatch) => {
    try {
        dispatch({type: ADD_POINTVENTE_REQUEST})

        const response = await Instance.post('/point_vente/add', data)
        dispatch({
            type: ADD_POINTVENTE_SUCCESS,
            payload: response.data.pointVente
        });
        return true

    } catch (error) {
        dispatch({
            type: ADD_POINTVENTE_FAILURE,
            payload: error.response.message || 'Error while add point vente'
        });

        return false
    }
}
export const updatePointVente = (ice, data) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_POINTVENTE_REQUEST})

        const response = await Instance.put(`/point_vente/update/${ice}`, data)
        dispatch({
            type: UPDATE_POINTVENTE_SUCCESS,
            payload: response.data.pointVente
        })
        return true;
    } catch (error) {
        dispatch({
            type: UPDATE_POINTVENTE_FAILURE,
            payload: error.response.data.message || 'Update point de vente error'
        });
        return false
    }
}