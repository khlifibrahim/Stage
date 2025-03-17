import express from 'express'
import { getIndhList, addIndh, getIndhById, updateIndh, deleteIndh, updateHistoriqueObservation, searchIndh } from '../controllers/indh.controller.js'

const router = express.Router();

router.get('/list', getIndhList)
router.get('/search', searchIndh)
router.post('/getIndh', getIndhById)
router.post('/add', addIndh)
router.put('/update/:id', updateIndh)
router.delete('/delete/:id', deleteIndh)
router.post('/updateObservation', updateHistoriqueObservation)

export default router;
