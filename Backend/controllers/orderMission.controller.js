// import { connect, connection } from "mongoose"
import { connectSQL } from "../database/connectDB.js"

export  const getOrderMission = async (req, res) => {
    try {
        const connection = await connectSQL();

        // const [missions] = await connection.query('SELECT * FROM `mission`')
        const query = 'SELECT Titre, destination, departure_date, companion, statue FROM `mission`'
        const [missions] = await connection.query(query)
        const missionsData = missions[0]
        console.log('Missions List (line 12) ',missions)

        res.status(200).json({
            success: true,
            message: 'Missions fetched successfully',
            missions: missions
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

        const [cadres] = await connect.query('SELECT * FROM `cadre` WHERE nom LIKE ?', [`%${name}%`])
        console.log(cadres)

        if(cadres.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No cadre found!!'
            })
        }

        res.status(200).json({
            success: true,
            message: 'Cadres fetched successfully',
            cadres: cadres
        })
    } catch (error) {
        console.log('Error fetching cadres: ', error);
        return res.status(400).json({
            success: false,
            message: 'No cadre found!!'
        })
    }
}


export const createOrderMission  = async (req, res)=> {

    try {
        const connection = await connectSQL();

        const {
            cadreId,
            title,
            destination,
            purpose,
            depDate,
            depHour,
            arrHour,
            durationDays,
            plateNumber,
            companion,
            status
        } = req.body

        if(
            !cadreId ||
            !title ||
            !destination ||
            !purpose ||
            !depDate ||
            !depHour ||
            !arrHour ||
            !durationDays ||
            !plateNumber ||
            !companion ||
            !status
        ) {
            return res.status(400).json({
                success: false,
                message: 'All fields required'
            })
        }

        const [result] = await connection.execute(`INSERT INTO mission 
            (
            Titre, 
            destination, 
            purpose, 
            departure_date, 
            duration_days, 
            companion, 
            s_matricule, 
            heure_de_depart, 
            heure_arrive, 
            statue) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            title,
            destination,
            purpose,
            depDate,
            durationDays,
            companion || null,
            plateNumber || null,
            depHour,
            arrHour,
            status
        ]);

        const missionId = result.insertId
        const [insertIntoMissionCadreTable] = await connection.execute('INSERT INTO mission_cadre (mission_id, cadre_id) VALUES (?, ?)', [
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
            return res.status(500).json({
                success: false,
                message: 'Failed to create Mission'
            })
        }


    // res.status(201).json({
    //     success: true,
    //     message: "Mission created successfully",
    //     // missionId
    // })


    }catch(error) {
        console.log('Error getting Cadres', error)
        res.status(400).json({
            success: false,
            message: 'Error inserting from database data from database'
        })
    }
}

export const updateOrderMission = async (req, res) => {
    res.send('updateOrderMission controller')
}

export const deleteOrderMission = async (req, res) => {
    res.send('deleteOrderMission')
}


