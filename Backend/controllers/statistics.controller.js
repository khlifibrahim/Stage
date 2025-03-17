import { connectSQL } from "../database/connectDB.js"

export const getNbMission = async (connect) => {
    try {
        // const connect = await connectSQL();
        const query = `
            SELECT count(*) AS nombre_missions 
            FROM defaultdb.mission;
        `;
        const [result] = await connect.query(query);
        return result[0].nombre_missions; // Retour
        // ne directement le nombre de missions
    } catch (error) {
        throw error;
    }
};

export const getNbControl = async (connect) => {
    try {
        // const connect = await connectSQL();
        const query = `
            SELECT count(*) AS nombre_controles 
            FROM defaultdb.controle;
        `;
        const [result] = await connect.query(query);
        return result[0].nombre_controles; // Retourne directement le nombre de contrôles
    } catch (error) {
        throw error;
    }
};

export const getNbrMissionByMonth = async (connect) => {
    try {
        // const connect = await connectSQL();
        const query = `
            SELECT 
                YEAR(departure_date) AS year, 
                MONTH(departure_date) AS month, 
                COUNT(*) AS missions_count
            FROM mission
            GROUP BY YEAR(departure_date), MONTH(departure_date)
            ORDER BY year DESC, month DESC;
        `;
        const [result] = await connect.query(query);
        return result; // Retourne directement les résultats
    } catch (error) {
        throw error;
    }
};

export const getNbrNonConformeByPratique = async (connect) => {
    try {
        // const connect = await connectSQL();
        const query = `
            SELECT 
                COUNT(CASE WHEN affichage_prix = 'non-conforme' THEN 1 END) AS affichage_prix_non_conforme,
                COUNT(CASE WHEN solde = 'non-conforme' THEN 1 END) AS solde_non_conforme,
                COUNT(CASE WHEN publicite = 'non-conforme' THEN 1 END) AS publicité_non_conforme,
                COUNT(CASE WHEN tickets_caisses = 'non-conforme' THEN 1 END) AS NBR_tickets_caisses_non_conforme,
                COUNT(CASE WHEN vente_avec_prime = 'non-conforme' THEN 1 END) AS NBr_vente_avec_prime_non_conforme
            FROM controle;
        `;
        const [result] = await connect.query(query);
        return result[0]; // Retourne directement les résultats
    } catch (error) {
        throw error;
    }
};

// Nouvelles fonctions pour les statistiques INDH

// Nombre de projets objet d'une convention
export const getNombreProjetIndh = async (connect) => {
    try {
        const query = `
            SELECT COUNT(*) AS nombre_projets 
            FROM defaultdb.indh
            WHERE numero_convention IS NOT NULL AND numero_convention != '';
        `;
        const [result] = await connect.query(query);
        return result[0].nombre_projets;
    } catch (error) {
        throw error;
    }
};

// Montant global de la contribution de l'INDH par année
export const getContributionIndhParAnnee = async (connect) => {
    try {
        const query = `
            SELECT 
                annee, 
                SUM(contribution_indh) AS montant_total
            FROM defaultdb.indh
            GROUP BY annee
            ORDER BY annee;
        `;
        const [result] = await connect.query(query);
        return result;
    } catch (error) {
        throw error;
    }
};

// Montant global de la contribution de l'INDH par province
export const getContributionIndhParProvince = async (connect) => {
    try {
        // Cette requête suppose que vous avez une colonne province dans la table indh
        // Si ce n'est pas le cas, vous devrez adapter cette requête ou ajouter cette colonne
        const query = `
            SELECT 
                IFNULL(m.Id_des, 'Non spécifié') AS province_id,
                IFNULL(d.Destination, 'Non spécifié') AS province,
                SUM(i.contribution_indh) AS montant_total
            FROM defaultdb.indh i
            LEFT JOIN defaultdb.historique_mission_indh hmi ON i.id = hmi.indh_id
            LEFT JOIN defaultdb.mission m ON hmi.mission_id = m.mission_id
            LEFT JOIN defaultdb.Destination d ON m.Id_des = d.Id_des
            GROUP BY province_id, province
            ORDER BY montant_total DESC;
        `;
        const [result] = await connect.query(query);
        return result;
    } catch (error) {
        throw error;
    }
};

// Montant global de la contribution de l'INDH sur une période donnée
export const getContributionIndhParPeriode = async (connect, dateDebut, dateFin) => {
    try {
        console.log('Date parameters received:', { dateDebut, dateFin });
        
        // Ensure dates are in the correct format for MySQL
        const formattedDateDebut = dateDebut ? new Date(dateDebut).toISOString().split('T')[0] : null;
        const formattedDateFin = dateFin ? new Date(dateFin).toISOString().split('T')[0] : null;
        
        console.log('Formatted dates:', { formattedDateDebut, formattedDateFin });
        
        // Build the query with proper date filtering
        let query = `
            SELECT 
                SUM(contribution_indh) AS montant_total
            FROM defaultdb.indh
            WHERE 1=1
        `;
        
        // Build parameters array based on which dates are provided
        const params = [];
        
        // Add date filtering conditions
        if (formattedDateDebut) {
            // Filter by date_cpdh if available, otherwise by annee
            query += ` AND (
                (date_cpdh IS NOT NULL AND date_cpdh >= ?) 
                OR 
                (date_cpdh IS NULL AND annee >= YEAR(?))
            )`;
            params.push(formattedDateDebut, formattedDateDebut);
        }
        
        if (formattedDateFin) {
            // Filter by date_cpdh if available, otherwise by annee
            query += ` AND (
                (date_cpdh IS NOT NULL AND date_cpdh <= ?) 
                OR 
                (date_cpdh IS NULL AND annee <= YEAR(?))
            )`;
            params.push(formattedDateFin, formattedDateFin);
        }
        
        console.log('SQL Query:', query);
        console.log('Query parameters:', params);
        
        const [result] = await connect.query(query, params);
        console.log('Query result:', result);
        return result[0].montant_total || 0;
    } catch (error) {
        console.error('Error in getContributionIndhParPeriode:', error);
        throw error;
    }
};

// Nombre de projets traités par province
export const getNombreProjetParProvince = async (connect) => {
    try {
        const query = `
            SELECT 
                IFNULL(m.Id_des, 'Non spécifié') AS province_id,
                IFNULL(d.Destination, 'Non spécifié') AS province,
                COUNT(DISTINCT i.id) AS nombre_projets
            FROM defaultdb.indh i
            LEFT JOIN defaultdb.historique_mission_indh hmi ON i.id = hmi.indh_id
            LEFT JOIN defaultdb.mission m ON hmi.mission_id = m.mission_id
            LEFT JOIN defaultdb.Destination d ON m.Id_des = d.Id_des
            GROUP BY province_id, province
            ORDER BY nombre_projets DESC;
        `;
        const [result] = await connect.query(query);
        return result;
    } catch (error) {
        throw error;
    }
};

// Fonction pour récupérer l'état d'avancement physique de chaque projet
// Note: Cette fonction suppose que vous avez un champ pour suivre l'avancement dans la table historique_mission_indh
// Si ce n'est pas le cas, vous devrez adapter cette fonction ou ajouter ce champ
export const getEtatAvancementProjets = async (connect) => {
    try {
        const query = `
            SELECT 
                i.id,
                i.nom,
                i.type_activite,
                i.montant_total,
                i.contribution_indh,
                MAX(hmi.created_at) as derniere_mise_a_jour,
                hmi.observation as etat_avancement
            FROM defaultdb.indh i
            LEFT JOIN defaultdb.historique_mission_indh hmi ON i.id = hmi.indh_id
            GROUP BY i.id, i.nom, i.type_activite, i.montant_total, i.contribution_indh, hmi.observation
            ORDER BY derniere_mise_a_jour DESC;
        `;
        const [result] = await connect.query(query);
        return result;
    } catch (error) {
        throw error;
    }
};

export const fetchStatisticsByRole = async (req, res) => {
    const { role } = req.query;
    const { dateDebut, dateFin } = req.query; // Pour filtrer par période
    
    console.log('fetchStatisticsByRole received params:', { role, dateDebut, dateFin });
    
    const pool = await connectSQL(); // Obtenir le pool
    const connection = await pool.getConnection(); // Obtenir une connexion

    try {
        if (role === 'DIRECTEUR') {
            // Statistiques existantes
            const missions = await getNbMission(connection);
            const controls = await getNbControl(connection);
            const missionsByMonth = await getNbrMissionByMonth(connection);
            const nonConformes = await getNbrNonConformeByPratique(connection);
            
            // Nouvelles statistiques INDH
            const nombreProjetsIndh = await getNombreProjetIndh(connection);
            const contributionIndhParAnnee = await getContributionIndhParAnnee(connection);
            const contributionIndhParProvince = await getContributionIndhParProvince(connection);
            const nombreProjetParProvince = await getNombreProjetParProvince(connection);
            const etatAvancementProjets = await getEtatAvancementProjets(connection);
            
            // Statistique conditionnelle si dateDebut et dateFin sont fournis
            let contributionIndhPeriode = null;
            if (dateDebut && dateFin) {
                console.log('Fetching contribution for period:', { dateDebut, dateFin });
                contributionIndhPeriode = await getContributionIndhParPeriode(connection, dateDebut, dateFin);
                console.log('Contribution for period result:', contributionIndhPeriode);
            } else {
                console.log('No date range provided for contribution period');
            }

            console.log("Données pour DIRECTEUR:");
            console.log("Missions:", missions);
            console.log("Controls:", controls);
            console.log("Missions par mois:", missionsByMonth);
            console.log("Non conformes:", nonConformes);
            console.log("Nombre de projets INDH:", nombreProjetsIndh);

            res.status(200).json({
                success: true,
                message: 'Statistiques récupérées avec succès pour le directeur',
                data: {
                    missions,
                    controls,
                    missionsByMonth,
                    nonConformes,
                    indh: {
                        nombreProjetsIndh,
                        contributionIndhParAnnee,
                        contributionIndhParProvince,
                        contributionIndhPeriode,
                        nombreProjetParProvince,
                        etatAvancementProjets
                    }
                },
            });
        } else if (role === 'CADRE') {
            const missionsByMonth = await getNbrMissionByMonth(connection);
            
            // Statistiques INDH pour les cadres
            const nombreProjetsIndh = await getNombreProjetIndh(connection);
            const etatAvancementProjets = await getEtatAvancementProjets(connection);

            console.log("Données pour CONTROLEUR:");
            console.log("Missions par mois:", missionsByMonth);
            console.log("Nombre de projets INDH:", nombreProjetsIndh);

            res.status(200).json({
                success: true,
                message: 'Statistiques récupérées avec succès pour le contrôleur',
                data: {
                    missionsByMonth,
                    indh: {
                        nombreProjetsIndh,
                        etatAvancementProjets
                    }
                },
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Rôle invalide',
            });
        }
    } catch (error) {
        console.error("Erreur dans fetchStatisticsByRole:", error);
        res.status(500).json({
            success: false,
            message: 'Erreur interne du serveur',
            error: error.message
        });
    }finally {
        connection.release(); // Toujours libérer la connexion
      }
};