import { connect } from "mongoose"
import { connectSQL } from "../database/connectDB.js"

export  const getOrderMission = async (req, res) => {
    res.send('Get orders controller works!!')
}

export const createOrderMission = async (req, res) => {
    res.send('createOrderMission route')
    
}

export const getCarsAndCadres = async (req, res)=> {
    try {
        const connection = await connectSQL();
        const [cadre] = await connection.query('SELECT * FROM `cadre`')
        const [vehicles] = await connection.query("SELECT s_matricule, model FROM service_vehicle")
        const [grade] = await connection.query("SELECT * FROM `grade`")
        const cadreData = cadre[0]
        const carData = vehicles[0]
        const gradeData = grade[0]
        const fullData = {
            ...cadreData, 
            ...gradeData, 
            ...carData
            
        }
        console.log(fullData);

        res.status(200).json({
            success: true,
            message: 'Cadre fetched successfully',
            // data: fullData
            cadreData: cadreData,
            '#####:': '######',
            carData: carData,
            '#####:': '######',
            gradeData: gradeData
        })

    }catch(error) {
        console.log('Error getting Cadres', error)
        res.status(400).json({
            success: false,
            message: 'Error getting data from database'
        })
    }
}

export const updateOrderMission = async (req, res) => {
    res.send('updateOrderMission controller')
}

export const deleteOrderMission = async (req, res) => {
    res.send('deleteOrderMission')
}