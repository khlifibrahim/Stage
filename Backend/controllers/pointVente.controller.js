import { connectSQL } from "../database/connectDB.js"

export const getPointVenteList = async (req, res) => {
    const pool = await connectSQL(); // Obtenir le pool
    const connect = await pool.getConnection(); // Obtenir une connexion
    try {
        // const connect = await connectSQL();
        const query = `
            SELECT * 
            FROM defaultdb.point_vente;
        `;
        const [result] = await connect.query(query)
        console.log(result)

        res.status(200).json({
            success: true,
            message: 'All point_ventes fetchd successfully!!',
            pointVentes: result
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

export const getPointVenteById = async (req, res) => {
    const { id } = req.body
    const pool = await connectSQL(); // Obtenir le pool
    const connect = await pool.getConnection(); // Obtenir une connexion
    try {
        // const connect = await connectSQL();
        const query = `
            SELECT *
            FROM defaultdb.point_vente
            WHERE id_point_vente = ?
            ;
        `;
        const [result] = await connect.query(query, id)

        if (result.length > 0) {
            res.status(200).json({
                success: true,
                message: 'pointVente fetchd successfully!!',
                pointVente: result
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'pointVente not found!!'
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error!!'
        })
    } finally {
        connect.release(); // Toujours libérer la connexion
    }
}

export const addPointVente = async (req, res) => {
    const {
        name,
        lat,
        lng,
        address,
    } = req.body


    if (
        !name ||
        !lat ||
        !lng ||
        !address
    ){
        res.status(400).json({
            success: false,
            message: "All fields are required!"
        })
    }

    const pool = await connectSQL(); // Obtenir le pool
    const connect = await pool.getConnection(); // Obtenir une connexion
    try {
        // const connect = await connectSQL()
        const query = `
        INSERT INTO point_vente(
                    name,lat,lng,address
        ) VALUES (?, ?, ?, ?)`;
        const [response] = await connect.execute(query,
            [name, lat, lng, address]
        )

        if (response.affectedRows === 1) {
            res.status(201).json({
                success: true,
                message: 'pointVente added successfully'
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Error adding pointVente!'
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

export const updatePointVente = async (req, res) => {
    const {
        name,
        lat,
        lng,
        address
    } = req.body;

    // Ensure that ICE is provided, as it is required to find the pointVente to update
    if (!ICE) {
        return res.status(400).json({
            success: false,
            message: "ICE is required to identify the pointVente",
        });
    }

    // Validate if required fields are present
    if (
        !name ||
        !lat ||
        !lng ||
        !address
    ) {
        return res.status(400).json({
            success: false,
            message: "All fields are required!",
        });
    }

    const pool = await connectSQL(); // Obtenir le pool
    const connect = await pool.getConnection(); // Obtenir une connexion

    try {
        // const connect = await connectSQL(); // Establish database connection
        const query = `
            UPDATE point_vente
            SET 
                name = ?,
                lat = ?,
                lng = ?,
                address = ?
            WHERE id_point_vente = ?
        `;
        const [response] = await connect.execute(query, [
            name,
            lat,
            lng,
            address
        ]);

        if (response.affectedRows === 1) {
            return res.status(200).json({
                success: true,
                message: "pointVente updated successfully",
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Error updating pointVente! The pointVente may not exist.",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    } finally {
        connect.release(); // Toujours libérer la connexion
    }
};
