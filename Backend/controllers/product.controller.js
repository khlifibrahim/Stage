import { connectSQL } from "../database/connectDB.js";



// Endpoints of FamillyProducts
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
        const connect = await connectSQL();

        const query = 'SELECT * FROM familleproduit;';
        const [results] = await connect.query(query);

        res.status(200).json({
            success: true,
            message: 'Family products fetched successfully',
            familly: results
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getFamilleProduitById = async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'SELECT * FROM famille_produit WHERE id_familleproduit = ?';
        const results = await connectDB.query(query, [id]);
        if (results.length > 0) {
            res.status(200).json(results[0]);
        } else {
            res.status(404).json({ message: 'Famille de produit non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateFamilleProduit = async (req, res) => {
    const { id } = req.params;
    const { libelle } = req.body;
    try {
        const query = 'UPDATE famille_produit SET libelle = ? WHERE id_familleproduit = ?';
        await connectDB.query(query, [libelle, id]);
        res.status(200).json({ id, libelle });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const deleteFamilleProduit = async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'DELETE FROM famille_produit WHERE id_familleproduit = ?';
        await connectDB.query(query, [id]);
        res.status(200).json({ message: 'Famille de produit supprimée' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Endpoints of Products
export const createProduit = async (req, res) => {
    const { productName, productFamillyId } = req.body;
    try {
        const connect = await connectSQL();

        const query = 'INSERT INTO produit (nom_produit, id_familleproduit) VALUES (?, ?)';
        const [result] = await connect.query(query, [productName, productFamillyId]);

        res.status(201).json({
            id: result.insertId, 
            productName, 
            productFamillyId 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
}

export const getAllProduits = async (req, res) => {
    try {
        const connect = await connectSQL();

        const query = 'SELECT * FROM produit';
        const [results] = await connect.query(query);

        res.status(200).json({
            success: true,
            message: 'all products fetched successfully!!',
            products: results
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const connect = await connectSQL();

        const query = 'SELECT * FROM produit WHERE id_produit = ?';
        const [results] = await connect.query(query, [id]);

        if (results.length > 0) {
            res.status(200).json(results[0]);
        } else {
            res.status(404).json({ message: 'Produit non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getProduitByFamille = async (req, res) => {
    const { id_familleproduit } = req.params;
    try {
        const connect = await connectSQL();

        const query = 'SELECT * FROM produit WHERE id_familleproduit = ?';
        const results = await connect.query(query, [id_familleproduit]);
        if (results.length > 0) {
            res.status(200).json(results);
        } else {
            res.status(404).json({ message: 'Aucun produit trouvé pour cette famille' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateProduit = async (req, res) => {
    const { id } = req.params;
    const { nom_produit, id_familleproduit } = req.body; // Suppression de critercontrole
    try {
        const connect = await connectSQL();

        const query = 'UPDATE produit SET nom_produit = ?, id_familleproduit = ? WHERE id_produit = ?';
        await connect.query(query, [nom_produit, id_familleproduit, id]);
        res.status(200).json({ id, nom_produit, id_familleproduit });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteProduit = async (req, res) => {
    const { id } = req.params;
    
    try {
        const connect = await connectSQL();

        const query = 'DELETE FROM produit WHERE id_produit = ?';
        await connect.query(query, [id]);
        res.status(200).json({ 
            message: 'Produit supprimé' 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
}