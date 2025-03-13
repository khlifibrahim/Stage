import { connectSQL } from "../database/connectDB.js";


export const getAllControls = async (req, res) => {
    try {
        const connection = await connectSQL();
        const [controls] = await connection.query("SELECT * FROM control24_09local");
        const controlsList = controls.map(control => ({
            ...control, 
            loi: 'loi 24'
        }));
        console.log('Controls 24: ', controls)
        res.status(200).json({ 
            success: true,
            controls24: controlsList 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Error fetching controls", error: error.message });
    }
};


export const getControlById = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await connectSQL();
        const [control] = await connection.query("SELECT * FROM control24_09local WHERE id_control24_09local = ?", [id]);

        if (control.length === 0) {
            return res.status(404).json({ 
                success: false,
                message: "Control not found" 
            });
        }

        res.status(200).json({ 
            success: true,
            control24: control[0] 
        });

    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Error fetching control", 
            error: error.message 
        });
    }
};


export const createControl24 = async (req, res) => {
    try {
        const connection = await connectSQL();
        const {
            id_mission, id_cadre, entreprise, id_familleproduit, id_produit,
            control_documentaire, controle_physqiue, prelevement, etiquette_prelevement,
            pv_prevelement, bc_prevelement, status, observation
        } = req.body;

        const query = `
            INSERT INTO control24_09local 
            (id_mission, id_cadre, entreprise, id_familleproduit, id_produit, 
            control_documentaire, controle_physqiue, prelevement, etiquette_prelevement, 
            pv_prevelement, bc_prevelement, status, observation) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            id_mission, id_cadre, entreprise, id_familleproduit, id_produit,
            control_documentaire, controle_physqiue, prelevement, etiquette_prelevement,
            pv_prevelement, bc_prevelement, status, observation
        ];

        await connection.query(query, values);

        res.status(201).json({ 
            success: true,
            message: "Control created successfully" 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Error creating control", 
            error: error.message 
        });
    }
};


export const updateControl = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await connectSQL();
        const {
            id_mission, id_cadre, entreprise, id_familleproduit, id_produit,
            control_documentaire, controle_physqiue, prelevement, etiquette_prelevement,
            pv_prevelement, bc_prevelement, status, observation
        } = req.body;

        const query = `
            UPDATE control24_09local 
            SET id_mission=?, id_cadre=?, entreprise=?, id_familleproduit=?, id_produit=?, 
            control_documentaire=?, controle_physqiue=?, prelevement=?, etiquette_prelevement=?, 
            pv_prevelement=?, bc_prevelement=?, status=?, observation=? 
            WHERE id_control24_09local=?
        `;

        const values = [
            id_mission, id_cadre, entreprise, id_familleproduit, id_produit,
            control_documentaire, controle_physqiue, prelevement, etiquette_prelevement,
            pv_prevelement, bc_prevelement, status, observation, id
        ];

        const [result] = await connection.query(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ 
                success: false,
                message: "Control not found" 
            });
        }

        res.status(200).json({ 
            success: true,
            message: "Control updated successfully" 
        });

    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Error updating control", 
            error: error.message 
        });
    }
};


export const deleteControl24 = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await connectSQL();
        const [result] = await connection.query("DELETE FROM control24_09local WHERE id_control24_09local = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ 
                success: false,
                message: "Control not found" 
            });
        }

        res.status(200).json({ 
            success: true,
            message: "Control deleted successfully" 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Error deleting control", 
            error: error.message 
        });
    }
};
