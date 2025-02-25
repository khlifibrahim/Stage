import { connectSQL } from "../database/connectDB.js"

export const getEnterpriseList = async (req, res) => {
    try {
        const connect = await connectSQL();
        const query = `
            SELECT * 
            FROM defaultdb.entreprise;
        `;
        const [result] = await connect.query(query)
        console.log(result)

        res.status(200).json({
            success: true,
            message: 'All enterprises fetchd successfully!!',
            enterprises: result
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'internal server error !!',
            Error: error
        })
    }
}

export const searchEnterprise = (req, res) => {
    try {
        res.send('searching...')
    } catch (error) {
        
    }
}

export const addEnterprise = async (req, res) => {
    const {
        ICE,
        activite,
        adresse,
        email,
        nom_entreprise,
        numero_ATP,
        raison_sociale,
        telephone,
    } = req.body
    
    
    if( 
        !ICE ||
        !activite ||
        !adresse ||
        !nom_entreprise ||
        !numero_ATP ||
        !raison_sociale ||
        !telephone
    ){res.status(400).json({
        success: false,
        message: "All fields are required!"
    })}
    
    try {
        const connect = await connectSQL()
        const query = `
        INSERT INTO entreprise(
                ICE ,
                numero_ATP ,
                nom_entreprise ,
                adresse ,
                telephone ,
                email ,
                raison_sociale ,
                activite
        )VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        const [response] = await connect.execute(query, [ICE,numero_ATP,nom_entreprise,adresse,telephone,email,raison_sociale,activite])

        if(response.affectedRows === 1) {
            res.status(201).json({
                success: true,
                message: 'Enterprise added successfully'
            })
        }else {
            res.status(400).json({
                success: false,
                message: 'Error adding Enterprise!'
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server Error'
        })
        throw error
    }
}