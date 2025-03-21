import { connectSQL } from "../database/connectDB.js"


// export  const getOrderMission = async (req, res) => {
//     const { role, userid } = req.body
//     console.log("Role Send to backend: ", role)
//     try {
//         const connect = await connectSQL();

//         const queryForAll = `
        //     SELECT 
        //         m.*,
        //         c.cadre_id,
        //         c.delegation,
        //         c.p_matricule AS carPlate,
        //         u.nom AS cadre_nom,
        //         u.prenom AS cadre_prenom,
        //         g.grade_name,
        //         d.Destination,
        //         o.Object_type
        //     FROM mission m
        //     JOIN mission_cadre mc ON m.mission_id = mc.mission_id
        //     JOIN cadre c ON mc.cadre_id = c.cadre_id
        //     JOIN Utilisateur u ON c.id_utilisateur = u.id_utilisateur
        //     JOIN grade g ON c.grade_id = g.grade_id
        //     JOIN Destination d ON m.Id_des = d.id_des
        //     JOIN Object o ON m.Id_object = o.Id_object
        //     ;
        // `;

//         const queryForCadre = `
                        // SELECT 
                        //     m.*,
                        //     c.cadre_id,
                        //     c.delegation,
                        //     c.p_matricule AS carPlate,
                        //     u.nom AS cadre_nom,
                        //     u.prenom AS cadre_prenom,
                        //     g.grade_name,
                        //     d.Destination,
                        //     o.Object_type
                        // FROM mission m
                        // JOIN mission_cadre mc ON m.mission_id = mc.mission_id
                        // JOIN cadre c ON mc.cadre_id = c.cadre_id
                        // JOIN Utilisateur u ON c.id_utilisateur = u.id_utilisateur
                        // JOIN grade g ON c.grade_id = g.grade_id
                        // JOIN Destination d ON m.Id_des = d.id_des
                        // JOIN Object o ON m.Id_object = o.Id_object
                        // WHERE m.status = 'En Cours' AND u.id_utilisateur = ?;`

//         if( role === 'CADRE') {
//             const [missions] = await connect.query(queryForCadre, [userid])
//             console.log('Missions for Cadre: ', missions)
            
//             res.status(200).json({
//                 success: true,
//                 message: 'Missions fetched successfully',
//                 missions: missions
//             })
//         }else {
//             const [missions] = await connect.query(queryForAll)
//             console.log('###################################\n###################################')
//             console.log('################# Missions for Director: ', missions)
//             console.log('###################################\n###################################')

//             res.status(200).json({
//                 success: true,
//                 message: 'Missions fetched successfully',
//                 missions: missions
//             })
//         }
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Error fetching missions data',
//             error: error.message
//         })
//     }
// }

export const getOrderMission = async (req, res) => {
    const { role, userid } = req.body
    
    console.log("Fetching missions for role:", role);
    
    try {
        const connect = await connectSQL();
        
        let query;
        let params = [];
        
        switch(role) {
            case 'DIRECTEUR':
                query = `
                    SELECT 
                            m.*,
                            c.cadre_id,
                            c.delegation,
                            c.p_matricule AS carPlate,
                            u.nom AS cadre_nom,
                            u.prenom AS cadre_prenom,
                            g.grade_name,
                            d.Destination,
                            o.Object_type
                        FROM mission m
                        JOIN mission_cadre mc ON m.mission_id = mc.mission_id
                        JOIN cadre c ON mc.cadre_id = c.cadre_id
                        JOIN Utilisateur u ON c.id_utilisateur = u.id_utilisateur
                        JOIN grade g ON c.grade_id = g.grade_id
                        JOIN Destination d ON m.Id_des = d.id_des
                        JOIN Objects o ON m.Id_object = o.Id_object
                        ;
                    `;
                break;
            case 'CHEFSERVICE':
                query = `
                    SELECT 
                        m.*,
                        c.cadre_id,
                        c.delegation,
                        c.p_matricule AS carPlate,
                        u.nom AS cadre_nom,
                        u.prenom AS cadre_prenom,
                        g.grade_name,
                        d.Destination,
                        o.Object_type
                    FROM mission m
                    JOIN mission_cadre mc ON m.mission_id = mc.mission_id
                    JOIN cadre c ON mc.cadre_id = c.cadre_id
                    JOIN Utilisateur u ON c.id_utilisateur = u.id_utilisateur
                    JOIN grade g ON c.grade_id = g.grade_id
                    JOIN Destination d ON m.Id_des = d.id_des
                    JOIN Objects o ON m.Id_object = o.Id_object
                    ;
                `;
                break;
                
            case 'CADRE':
                query = `
                    SELECT 
                        m.*,
                        c.cadre_id,
                        c.delegation,
                        c.p_matricule AS carPlate,
                        u.nom AS cadre_nom,
                        u.prenom AS cadre_prenom,
                        g.grade_name,
                        d.Destination,
                        o.Object_type
                    FROM mission m
                    JOIN mission_cadre mc ON m.mission_id = mc.mission_id
                    JOIN cadre c ON mc.cadre_id = c.cadre_id
                    JOIN Utilisateur u ON c.id_utilisateur = u.id_utilisateur
                    JOIN grade g ON c.grade_id = g.grade_id
                    JOIN Destination d ON m.Id_des = d.id_des
                    JOIN Objects o ON m.Id_object = o.Id_object
                    WHERE m.status = 'En Cours' AND u.id_utilisateur = ?
                `;
                // query = `
                //     SELECT 
                //         m.*,
                //         c.cadre_id,
                //         c.delegation,
                //         c.p_matricule AS carPlate,
                //         u.nom AS cadre_nom,
                //         u.prenom AS cadre_prenom,
                //         g.grade_name,
                //         d.Destination,
                //         o.Object_type
                //     FROM mission m
                //     JOIN mission_cadre mc ON m.mission_id = mc.mission_id
                //     JOIN cadre c ON mc.cadre_id = c.cadre_id
                //     JOIN Utilisateur u ON c.id_utilisateur = u.id_utilisateur
                //     JOIN grade g ON c.grade_id = g.grade_id
                //     JOIN Destination d ON m.Id_des = d.id_des
                //     JOIN Object o ON m.Id_object = o.Id_object
                //     JOIN Profile p ON u.id_profile = p.id_profile
                //     WHERE p.nom_profile = 'Cadre' AND u.id_utilisateur = ?
                // `;
                params = [userid];
                break;
                
            default:
                return res.status(400).json({
                    success: false,
                    message: 'Invalid role provided'
                });
        }
        
        const [missions] = await connect.query(query, params);
        
        console.log(`Missions fetched for role ${role}:`, missions);
        
        res.status(200).json({
            success: true,
            message: 'Missions fetched successfully',
            missions: missions
        })
        
    } catch (error) {
        console.error('Error fetching missions by role:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching missions',
            error: error.message
        });
    }
};

export const getOrderMissionById = async (req, res) => {
    const { id } = req.params
    
    try {
        const connect = await connectSQL();
        const query = `SELECT * FROM defaultdb.mission WHERE mission_id = ?`;
        
        const [missions] = await connect.query(query, [id])
        
        res.status(200).json({
            success: true,
            message: 'Missions fetched successfully',
            missions: missions[0]
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching missions data',
            error: error.message
        })
    }

}

export const getServiceCars = async (req, res) => {
    try {
        const connect = await connectSQL();
        const [cars] = await connect.query('SELECT * FROM `service_vehicle`')
        console.log(cars)

        res.status(200).json(
            cars
        )
    } catch (error) {
        
        res.status(500).json({
            success: false,
            massage: 'internal server error'
        })
    }
}

export const getObjectOptions = async (req, res) => {
    try {
        const connect = await connectSQL();
        
        // If the table has hierarchical structure, use the hierarchical query
        const query = `
            SELECT * FROM Objects 
            ORDER BY 
                CASE 
                    WHEN level_type = 'axe' THEN 1 
                    WHEN level_type = 'sous_axe' THEN 2 
                    WHEN level_type = 'mission' THEN 3 
                    ELSE 4 
                END, 
                order_num ASC
        `;
        
        const [objects] = await connect.query(query);
        
        // Create hierarchical structure
        const axes = [];
        const sousAxes = {};
        const missions = {};
        
        // Group objects by level
        objects.forEach(obj => {
            if (obj.level_type === 'axe') {
                axes.push({
                    ...obj,
                    sousAxes: []
                });
            } else if (obj.level_type === 'sous_axe') {
                sousAxes[obj.Id_object] = {
                    ...obj,
                    missions: []
                };
            } else if (obj.level_type === 'mission') {
                missions[obj.Id_object] = obj;
            }
        });
        
        // Build the hierarchy
        // Add missions to sous_axes
        objects.forEach(obj => {
            if (obj.level_type === 'mission' && sousAxes[obj.parent_id]) {
                sousAxes[obj.parent_id].missions.push(obj);
            }
        });
        
        // Add sous_axes to axes
        objects.forEach(obj => {
            if (obj.level_type === 'sous_axe') {
                const parentAxe = axes.find(axe => axe.Id_object === obj.parent_id);
                if (parentAxe) {
                    parentAxe.sousAxes.push(sousAxes[obj.Id_object]);
                }
            }
        });
        
        return res.status(200).json({
            success: true,
            objects: objects,
            hierarchicalObjects: axes
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
export const getDestinations = async (req, res) => {
    try {
        const connect = await connectSQL();
        const query = 'SELECT * FROM Destination';
        const [destinations] = await connect.query(query);
        console.log("Dest. endpoint: ",destinations)
        
        res.status(200).json({
            success: true,
            destinations: destinations
        })
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Error fetching destinations' });
    }
}

export const getCadre = async (req, res) => {
    try {
        const connect = await connectSQL();

        
        const [cadres] = await connect.query(`SELECT * FROM cadre ;`)
        console.log(cadres)
        
        return res.status(200).json({
                success: true,
                message: 'Cadres fetched successfully',
                cadres: cadres
            })
    } catch (error) {
        console.log('Error fetching cadres: ', error);
        return res.status(500).json({
            success: false,
            message: 'No cadre found!!'
        })
    }
}

export const getCadreById = async (req, res) => {
    const { id } = req.params
    try {
        const connect = await connectSQL();

        
        const [cadres] = await connect.query(`SELECT c.*, u.* 
                                                FROM cadre c
                                                JOIN Utilisateur u ON c.id_utilisateur = u.id_utilisateur
                                                WHERE c.cadre_id = ?;`, [id])
        console.log(cadres)
        
        return res.status(200).json({
                success: true,
                message: 'Cadres fetched successfully',
                cadres: cadres[0]
            })
    } catch (error) {
        console.log('Error fetching cadres: ', error);
        return res.status(500).json({
            success: false,
            message: 'No cadre found!!'
        })
    }
}

export const searchCadre = async (req, res) => {
    try {
        const connect = await connectSQL();
        const { name } = req.body;

        
        if(!name) {
            return res.status(400).json({
                success: false,
                message: 'Cadre name required'
            })
        }
        const [cadres] = await connect.query(`
            SELECT c.*, u.nom, u.prenom , g.grade_name 
            FROM cadre c
            INNER JOIN Utilisateur u ON c.id_utilisateur = u.id_utilisateur
            INNER JOIN grade g ON c.grade_id = g.grade_id
            WHERE u.nom LIKE ? OR u.prenom LIKE ? ;
            `, [`%${name}%`, `%${name}%`])
        console.log(cadres)
        

        if(cadres.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No cadre found!!'
            })
        }
        
        return res.status(200).json({
                success: true,
                message: 'Cadres fetched successfully',
                cadres: cadres
            })
    } catch (error) {
        console.log('Error fetching cadres: ', error);
        return res.status(500).json({
            success: false,
            message: 'No cadre found!!'
        })
    }
}


export const createOrderMission  = async (req, res)=> {

    const {
        cadreId,
        destinationId,
        objectId,
        depDate,
        depHour,
        arrHour,
        durationDays,
        plateNumber,
        companion
    } = req.body
    try {
        const connect = await connectSQL();

        if(
            !cadreId ||
            !destinationId ||
            !objectId ||
            !depDate ||
            !durationDays
        ) {
            console.log(
                cadreId ,
            destinationId ,
            objectId ,
            depDate ,
            durationDays
            )
            return res.status(400).json({
                success: false,
                message: 'All fields required'
            })
        }

        const [result] = await connect.execute(`INSERT INTO mission 
            (
            departure_date,
            duration_days,
            companion,
            s_matricule,
            heure_de_depart,
            heure_arrive,
            Id_des,
            Id_object
            ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            depDate,
            durationDays,
            companion || null,
            plateNumber || null,
            depHour || null,
            arrHour || null,
            destinationId,
            objectId
        ]);

        const missionId = result.insertId
        const [insertIntoMissionCadreTable] = await connect.execute('INSERT INTO mission_cadre (mission_id, cadre_id) VALUES (?, ?)', [
            missionId,
            cadreId
        ])

        const IDs = {
            missionId,
            cadreId
        }


        if(result.affectedRows === 1 && insertIntoMissionCadreTable.affectedRows === 1){
            return res.status(201).json({
                success: true,
                message: 'Mission created successfully and missionCadre table updated',
                missionId: IDs
            })
        }else {
            return res.status(400).json({
                success: false,
                message: 'Failed to create Mission'
            })
        }


    }catch(error) {
        console.log('Error getting Cadres', error)
        res.status(400).json({
            success: false,
            message: 'Error inserting data to database'
        })
    }
}

export const updateOrderMission = async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            arrHour,
            cadreId,
            companion,
            depDate,
            depHour,
            destinationId,
            durationDays,
            missionId,
            objectId,
            plateNumber
         } = req.body

        console.log(id)
        if(!id || !cadreId) {
            return res.status(400).json({
                success: false,
                message: "Mission id and Cadre id required!"
            })
        }
        
        const connect = await connectSQL();
        await connect.beginTransaction();
        
        const missionQuery = `
            UPDATE mission SET 
                departure_date = ?, 
                duration_days = ?, 
                companion = ?, 
                s_matricule = ?, 
                heure_de_depart = ?, 
                heure_arrive = ?, 
                Id_des = ?, 
                Id_object = ? 
            WHERE mission_id = ?`;
        await connect.query(missionQuery, [
            depDate, durationDays, companion, plateNumber, 
            depHour, arrHour, destinationId, objectId, missionId
        ]);

        await connect.query("DELETE FROM mission_cadre WHERE mission_id = ?", [id]);
        await connect.query("INSERT INTO mission_cadre (mission_id, cadre_id) VALUES (?, ?)", [id, cadreId]);

        await connect.commit();

        return res.status(200).json({
            success: true,
            message: 'Mission updated successfully'
        })


    } catch (error) {
        console.log('Error updating mission: ', error)
        res.status(500).json({
            success: false,
            message: 'update mission failed while update it from db'
        })
    }
}

export const updateOrderMissionStatus = async (req, res) => {
    const {id} = req.params;
    const {status} = req.body

    if (!id || !status ) {
        return res.status(400).json({
            success: false,
            message: "id and status r required!"
        })
    }

    try {
        console.log("Data comming from Update status Endpoint: ", id , status)
        const connect = await connectSQL();
        
        const query = `UPDATE mission 
                        SET status = ? 
                        WHERE mission_id = ? `;
        const [result] = await connect.query(query, [status, id]);
        if(result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Mission not found!"
            })
        }
        await connect.commit()
        console.log("Status updates successfully!")
        return res.status(200).json({
            success: true,
            message: "Status updates successfully!",
        })
        
    } catch (error) {
        console.log('Error while updating status', error)
        return res.status(500).json({
            success: false,
            message: "Status updates error!",
        })
   }

}

export const deleteOrderMission = async (req, res) => {
    const { id } = req.params;

    try {
        const connect = await connectSQL();

        await connect.query('DELETE FROM mission_cadre WHERE mission_id = ?', [id]);

        const [ result ] = await connect.query(
            `DELETE FROM mission WHERE mission_id = ?`,
            [id]
        )

        if(result.affectedRows > 0 ) {
            return res.status(200).json({
                success: true,
                massage: 'Mission deleted successfully'
            })
        }else {
            return res.status(404).json({
                success: false,
                message: 'Mission not found'
            })
        }

    }catch (error) {
        console.error('error deleting mission', error)
        return res.status(500).send('Server Error')
    }
}
