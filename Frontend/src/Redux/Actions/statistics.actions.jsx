import Instance from '../../Api/axios';
import {
    FETCH_STATISTICS_REQUEST,
    FETCH_STATISTICS_SUCCESS,
    FETCH_STATISTICS_FAILURE

} from './Types.actions'

// Action pour récupérer les statistiques
export const fetchStatistics = (role, dateDebut, dateFin) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_STATISTICS_REQUEST });

        console.log("Fetching statistics with params:", { role, dateDebut, dateFin });
        const response = await Instance.get("/statistics", {
            params: { role, dateDebut, dateFin },
        });

        console.log("Réponse de l'API (fetchStatistics):", response.data);
        console.log("INDH contribution period data:", response.data.data?.indh?.contributionIndhPeriode);

        dispatch({
            type: FETCH_STATISTICS_SUCCESS,
            payload: response.data.data, // Assurez-vous que c'est bien response.data.data
        });
    } catch (error) {
        console.error("Erreur dans fetchStatistics:", error.response?.data || error.message);

        dispatch({
            type: FETCH_STATISTICS_FAILURE,
            payload: error.response?.data?.message || 'Erreur lors de la récupération des statistiques',
        });
        throw error;
    }
};