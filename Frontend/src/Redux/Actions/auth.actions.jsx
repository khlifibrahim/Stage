import { useNavigate } from 'react-router-dom';
import { ROLE_PERMISSIONS } from '../../Components/Utilities/role.permissions'
import Instance from '../../Api/axios';
import { 
    LOGINREQUEST,
    LOGINSUCCESS,
    LOGINFAILED,
    LOGOUT,
    CHECKAUTH
} from './Types.actions';

export const loginUser = (credentials) => async (dispatch) => {

    try {
        dispatch({ type: LOGINREQUEST })

        const response = await Instance.post('/auth/login', credentials);
        console.log("Login response: ", response.data.user)
        localStorage.setItem('auth', JSON.stringify({
            user: response.data.user, 
            token: response.data.token
        }))

        dispatch({
            type: LOGINSUCCESS,
            payload: {
                user: response.data.user,
                token: response.data.token,
                role: response.data.user.profile
            }
        })
    } catch (error) {
        dispatch({
            type: LOGINFAILED,
            payload: error.message
        });
        throw error
    }
}

export const logOut = () => (dispatch) => {
    localStorage.removeItem('auth');
    dispatch({ type: LOGOUT })
    // Navigate('/login')
}

export const verifyUser = () => (dispatch) => {
    const token = localStorage.getItem('authToken');

    if(token) {
        Instance.post('/auth/verifyToken');
    }
}