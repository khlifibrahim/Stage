import { connectSQL } from "../database/connectDB.js"
export const getNbMission = async (req, res) => {
    try {
        const connect = await connectSQL();
        const query = `
            SELECT  count(*) AS nombre_missions 
            FROM defaultdb.mission;
        `;
        const [result] = await connect.query(query)
        console.log(result)

        res.status(200).json({
            success: true,
            message: 'Nbr Mission get successfully!!',
            nbrmissions: result
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'internal server error !!',
            Error: error
        })
    }
}
export const getNbControl = async (req, res) => {
    try {
        const connect = await connectSQL();
        const query = `
            SELECT  count(*) AS nombre_controles 
            FROM defaultdb.controle;
        `;
        const [result] = await connect.query(query)
        console.log(result)

        res.status(200).json({
            success: true,
            message: 'Nbr controls get successfully!!',
            nbrmissions: result
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'internal server error !!',
            Error: error
        })
    }
}
export const getNbrMissionByMonth = async (req, res) => {
    try {
        const connect = await connectSQL();
        const query = `
            SELECT 
    YEAR(departure_date) AS year, 
    MONTH(departure_date) AS month, 
    COUNT(*) AS missions_count
FROM mission
GROUP BY YEAR(departure_date), MONTH(departure_date)
ORDER BY year DESC, month DESC;
        `;
        const [result] = await connect.query(query)
        console.log(result)

        res.status(200).json({
            success: true,
            message: ' get  NBR Missions by Month successfully!!',
            nbrmissions: result
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'internal server error !!',
            Error: error
        })
    }
}
export const getNbrNonConformeByPratique = async (req, res) => {
    try {
        const connect = await connectSQL();
        const query = `
            SELECT 
            COUNT(CASE WHEN affichage_prix = 'non-conforme' THEN 1 END) AS affichage_prix_non_conforme,
            COUNT(CASE WHEN solde = 'non-conforme' THEN 1 END) AS solde_non_conforme,
            COUNT(CASE WHEN publicite = 'non-conforme' THEN 1 END) AS publicité_non_conforme,
            COUNT(CASE WHEN tickets_caisses = 'non-conforme' THEN 1 END) AS NBR_tickets_caisses_non_conforme,
            COUNT(CASE WHEN vente_avec_prime = 'non-conforme' THEN 1 END) AS NBr_vente_avec_prime_non_conforme
            FROM controle;
        `;
        const [result] = await connect.query(query)
        console.log(result)

        res.status(200).json({
            success: true,
            message: ' get  NBR NON conforme by Pratic successfully!!',
            nbrmissions: result
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'internal server error !!',
            Error: error
        })
    }
}
