import Instance from '../../Api/axios';
import { 
    SET_ENTERPRISE_DETAILS,
    SUBMIT_ENTERPRISE_REQUEST, 
    SUBMIT_ENTERPRISE_SUCCESS, 
    SUBMIT_ENTERPRISE_FAILURE
    } from './Types.actions';

export const setEnterpriseDetails = (enterpriseData) => ({
    type: SET_ENTERPRISE_DETAILS,
    payload: enterpriseData
})

export const  submiteEnterprise = (enterpriseData) => async (dispatch) => {
    try {
        dispatch({
            type: SUBMIT_ENTERPRISE_REQUEST,
        })

        const response = await Instance.post('/enterprise/add', enterpriseData)
        dispatch({
            type: SUBMIT_ENTERPRISE_SUCCESS,
            payload: response.data.entreprises
        })
    } catch (error) {
        dispatch({
            type: SUBMIT_ENTERPRISE_FAILURE,
            payload: error.response ? error.response.data : "Error occurred"
        })
    }
}