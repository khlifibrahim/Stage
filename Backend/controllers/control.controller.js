import { connectSQL } from "../database/connectDB.js"

export const getControls = async (req, res) =>{
    try {
        const connect = await connectSQL();
        const query = `SELECT * FROM controle`;

        const [result] = await connect.query(query);

        res.status(200).json({
            success: true,
            message: "All controls fetched successfully",
            controls: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur interne du serveur'
        })
    }
}

export const updateControls = async (req, res) => {
    
}

export const addControl = async (req, res) => {
    
}