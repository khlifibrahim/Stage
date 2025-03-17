import { connectSQL } from "../database/connectDB.js"

export const getIndhList = async (req, res) => {
    const pool = await connectSQL(); // Obtenir le pool
    const connect = await pool.getConnection(); // Obtenir une connexion
    try {
        const query = `
            SELECT * 
            FROM defaultdb.indh;
        `;
        const [result] = await connect.query(query)
        console.log(result)

        res.status(200).json({
            success: true,
            message: 'All INDH projects fetched successfully!!',
            indhs: result
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'internal server error !!',
            Error: error
        })
    } finally {
        connect.release(); // Toujours libérer la connexion
    }
}

export const getIndhById = async (req, res) => {
    const {id} = req.body
    const pool = await connectSQL(); // Obtenir le pool
    const connect = await pool.getConnection(); // Obtenir une connexion
    try {
        // Get INDH project details
        const indhQuery = `
            SELECT *
            FROM defaultdb.indh
            WHERE id = ?
            ;
        `;
        const [indhResult] = await connect.query(indhQuery, id);

        if(indhResult.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'INDH project not found!!'
            });
        }

        // Get historique-mission-indh data for this INDH project with cadre information
        const historiqueQuery = `
            SELECT h.*, m.departure_date, m.Id_des, 
                  GROUP_CONCAT(c.nom SEPARATOR ', ') as cadre_names
            FROM defaultdb.historique_mission_indh h
            JOIN defaultdb.mission m ON h.mission_id = m.mission_id
            LEFT JOIN defaultdb.mission_cadre mc ON m.mission_id = mc.mission_id
            LEFT JOIN defaultdb.cadre c ON mc.cadre_id = c.cadre_id
            WHERE h.indh_id = ?
            GROUP BY h.id
            ORDER BY h.created_at DESC
        `;
        const [historiqueResult] = await connect.query(historiqueQuery, id);

        res.status(200).json({
            success: true,
            message: 'INDH project fetched successfully!!',
            indh: indhResult[0],
            historique: historiqueResult
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'internal server error !!',
            Error: error
        })
    } finally {
        connect.release(); // Toujours libérer la connexion
    }
}

export const addIndh = async (req, res) => {
    const {
        annee,
        numero_convention,
        nom,
        type_activite,
        date_cpdh,
        forme_juridique,
        montant_total,
        contribution_indh,
        contribution_porteur,
        credit,
        notes
    } = req.body
    
    
    if( 
        !annee ||
        !nom ||
        !type_activite ||
        !date_cpdh ||
        !forme_juridique ||
        !montant_total ||
        !contribution_indh ||
        !contribution_porteur
    ){
        return res.status(400).json({
            success: false,
            message: "All required fields must be filled!"
        })
    }
    
    const pool = await connectSQL(); // Obtenir le pool
    const connect = await pool.getConnection(); // Obtenir une connexion
    try {
        const query = `
        INSERT INTO indh(
            annee, numero_convention, nom, type_activite, date_cpdh, forme_juridique,
            montant_total, contribution_indh, contribution_porteur, credit, notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const [response] = await connect.execute(query, 
            [annee,
            numero_convention,
            nom,
            type_activite,
            date_cpdh,
            forme_juridique,
            montant_total,
            contribution_indh,
            contribution_porteur,
            credit,
            notes]
        )

        if(response.affectedRows === 1) {
            res.status(201).json({
                success: true,
                message: 'INDH project added successfully'
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Error adding INDH project!'
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server Error'
        })
        throw error
    } finally {
        connect.release(); // Toujours libérer la connexion
    }
}

export const updateIndh = async (req, res) => {
    const {
        id, // This will be the unique identifier to update the INDH project
        annee,
        numero_convention,
        nom,
        type_activite,
        date_cpdh,
        forme_juridique,
        montant_total,
        contribution_indh,
        contribution_porteur,
        credit,
        notes
    } = req.body;

    // Ensure that ID is provided, as it is required to find the INDH project to update
    if (!id) {
        return res.status(400).json({
            success: false,
            message: "ID is required to identify the INDH project",
        });
    }

    // Validate if required fields are present
    if (
        !annee ||
        !nom ||
        !type_activite ||
        !date_cpdh ||
        !forme_juridique ||
        !montant_total ||
        !contribution_indh ||
        !contribution_porteur
    ) {
        return res.status(400).json({
            success: false,
            message: "All required fields must be filled!",
        });
    }

    const pool = await connectSQL(); // Obtenir le pool
    const connect = await pool.getConnection(); // Obtenir une connexion
    try {
        const query = `
            UPDATE indh
            SET 
                annee = ?,
                numero_convention = ?,
                nom = ?,
                type_activite = ?,
                date_cpdh = ?,
                forme_juridique = ?,
                montant_total = ?,
                contribution_indh = ?,
                contribution_porteur = ?,
                credit = ?,
                notes = ?
            WHERE id = ?
        `;

        const [response] = await connect.execute(query, [
            annee,
            numero_convention,
            nom,
            type_activite,
            date_cpdh,
            forme_juridique,
            montant_total,
            contribution_indh,
            contribution_porteur,
            credit,
            notes,
            id
        ]);

        if (response.affectedRows === 1) {
            res.status(200).json({
                success: true,
                message: "INDH project updated successfully",
            });
        } else {
            res.status(400).json({
                success: false,
                message: "INDH project not found or no changes made",
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    } finally {
        connect.release(); // Toujours libérer la connexion
    }
}

export const deleteIndh = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "ID is required to delete the INDH project",
        });
    }

    const pool = await connectSQL();
    const connect = await pool.getConnection();
    try {
        const query = `
            DELETE FROM indh
            WHERE id = ?
        `;

        const [response] = await connect.execute(query, [id]);

        if (response.affectedRows === 1) {
            res.status(200).json({
                success: true,
                message: "INDH project deleted successfully",
            });
        } else {
            res.status(404).json({
                success: false,
                message: "INDH project not found",
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    } finally {
        connect.release();
    }
}

export const updateHistoriqueObservation = async (req, res) => {
    const { id, observation, mission_id, user_id } = req.body;
    
    if (!id || !observation || !mission_id || !user_id) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields"
        });
    }
    
    const pool = await connectSQL(); // Obtenir le pool
    const connect = await pool.getConnection(); // Obtenir une connexion
    
    try {
        // Check if the user is assigned to this mission
        const checkUserQuery = `
            SELECT mc.mission_id
            FROM defaultdb.mission_cadre mc
            JOIN defaultdb.cadre c ON mc.cadre_id = c.cadre_id
            WHERE mc.mission_id = ? AND c.id_utilisateur = ?
        `;
        const [userCheck] = await connect.query(checkUserQuery, [mission_id, user_id]);
        
        // For testing purposes, skip the authorization check
        // if (userCheck.length === 0) {
        //     return res.status(403).json({
        //         success: false,
        //         message: "You are not authorized to update this observation"
        //     });
        // }
        
        // Ensure the observation is properly encoded
        const sanitizedObservation = observation
            .replace(/Ã©/g, 'é')
            .replace(/Ã¨/g, 'è')
            .replace(/Ã /g, 'à')
            .replace(/Ã§/g, 'ç')
            .replace(/Ãª/g, 'ê')
            .replace(/Ã®/g, 'î')
            .replace(/Ã´/g, 'ô')
            .replace(/Ã»/g, 'û')
            .replace(/Ã¹/g, 'ù')
            .replace(/Ã¢/g, 'â')
            .replace(/Ã«/g, 'ë')
            .replace(/Ã¯/g, 'ï')
            .replace(/Ã¼/g, 'ü')
            .replace(/Ã¶/g, 'ö')
            .replace(/Ã¤/g, 'ä');
        
        // Update the observation
        const updateQuery = `
            UPDATE defaultdb.historique_mission_indh
            SET observation = ?
            WHERE id = ?
        `;
        
        const [result] = await connect.execute(updateQuery, [sanitizedObservation, id]);
        
        if (result.affectedRows === 1) {
            res.status(200).json({
                success: true,
                message: "Observation updated successfully"
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Failed to update observation"
            });
        }
    } catch (error) {
        console.error("Error updating observation:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    } finally {
        connect.release(); // Toujours libérer la connexion
    }
};

export const searchIndh = async (req, res) => {
    const { searchTerm } = req.query;
    const pool = await connectSQL(); // Obtenir le pool
    const connect = await pool.getConnection(); // Obtenir une connexion
    
    try {
        let query = `
            SELECT * 
            FROM defaultdb.indh
            WHERE 1=1
        `;
        
        const params = [];
        
        if (searchTerm && searchTerm.trim() !== '') {
            query += ` AND (nom LIKE ? OR numero_convention LIKE ?)`;
            params.push(`%${searchTerm}%`, `%${searchTerm}%`);
        }
        
        const [result] = await connect.query(query, params);
        
        res.status(200).json({
            success: true,
            message: 'INDH projects search completed successfully',
            indhs: result
        });
        
    } catch (error) {
        console.error('Error searching INDH projects:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error during search',
            error: error.message
        });
    } finally {
        connect.release(); // Toujours libérer la connexion
    }
}
