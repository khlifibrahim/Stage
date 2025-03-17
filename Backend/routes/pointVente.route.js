import express from 'express'
import { getPointVenteById, getPointVenteList, updatePointVente, addPointVente } from '../controllers/pointVente.controller.js';

const router = express.Router();

router.get('/list', getPointVenteList)
router.post('/getPointVente', getPointVenteById)
router.post('/add', addPointVente)
router.post('/update', updatePointVente)


export default router;