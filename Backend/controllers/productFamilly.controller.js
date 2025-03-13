import { connectSQL } from "../database/connectDB";

export const createFamilleProduit = async (req, res) => {
    const { libelle } = req.body;
    try {
        const connect = await connectSQL();

        const query = 'INSERT INTO famille_produit (libelle) VALUES (?)';
        const [result] = await connect.query(query, [libelle]);

        if(result.affectedRows === 1) {
            res.status(201).json({ 
                success: true,
                id: result.insertId, 
                libelle: result 
            });
        }else {
            res.status(400).json({
                success: false,
                message: 'Error adding product familly!'
            })
        }

    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
}

export const getAllFamilleProduits = async (req, res) => {
    try {
        const query = 'SELECT * FROM famille_produit';
        const results = await connectDB.query(query);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}