import express from 'express'
import { 
    fetchStatisticsByRole, 
    getNombreProjetIndh, 
    getContributionIndhParAnnee, 
    getContributionIndhParProvince, 
    getContributionIndhParPeriode, 
    getNombreProjetParProvince, 
    getEtatAvancementProjets 
} from '../controllers/statistics.controller.js'
import { connectSQL } from "../database/connectDB.js"

const router = express.Router()

// Route principale qui renvoie toutes les statistiques selon le rôle
router.get('/', fetchStatisticsByRole)

// Routes spécifiques pour les statistiques INDH
router.get('/indh/projets', async (req, res) => {
    const pool = await connectSQL();
    const connection = await pool.getConnection();
    try {
        const nombreProjets = await getNombreProjetIndh(connection);
        res.status(200).json({
            success: true,
            data: nombreProjets
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur interne du serveur',
            error: error.message
        });
    } finally {
        connection.release();
    }
});

router.get('/indh/contribution/annee', async (req, res) => {
    const pool = await connectSQL();
    const connection = await pool.getConnection();
    try {
        const contributionParAnnee = await getContributionIndhParAnnee(connection);
        res.status(200).json({
            success: true,
            data: contributionParAnnee
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur interne du serveur',
            error: error.message
        });
    } finally {
        connection.release();
    }
});

router.get('/indh/contribution/province', async (req, res) => {
    const pool = await connectSQL();
    const connection = await pool.getConnection();
    try {
        const contributionParProvince = await getContributionIndhParProvince(connection);
        res.status(200).json({
            success: true,
            data: contributionParProvince
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur interne du serveur',
            error: error.message
        });
    } finally {
        connection.release();
    }
});

router.get('/indh/contribution/periode', async (req, res) => {
    const { dateDebut, dateFin } = req.query;
    
    if (!dateDebut || !dateFin) {
        return res.status(400).json({
            success: false,
            message: 'Les paramètres dateDebut et dateFin sont requis'
        });
    }
    
    const pool = await connectSQL();
    const connection = await pool.getConnection();
    try {
        const contributionPeriode = await getContributionIndhParPeriode(connection, dateDebut, dateFin);
        res.status(200).json({
            success: true,
            data: contributionPeriode
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur interne du serveur',
            error: error.message
        });
    } finally {
        connection.release();
    }
});

router.get('/indh/projets/province', async (req, res) => {
    const pool = await connectSQL();
    const connection = await pool.getConnection();
    try {
        const projetsParProvince = await getNombreProjetParProvince(connection);
        res.status(200).json({
            success: true,
            data: projetsParProvince
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur interne du serveur',
            error: error.message
        });
    } finally {
        connection.release();
    }
});

router.get('/indh/avancement', async (req, res) => {
    const pool = await connectSQL();
    const connection = await pool.getConnection();
    try {
        const avancementProjets = await getEtatAvancementProjets(connection);
        res.status(200).json({
            success: true,
            data: avancementProjets
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur interne du serveur',
            error: error.message
        });
    } finally {
        connection.release();
    }
});

export default router