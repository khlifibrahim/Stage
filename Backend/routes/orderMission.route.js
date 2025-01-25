import express from 'express';
import { 
        getOrderMission, 
        createOrderMission, 
        updateOrderMission, 
        deleteOrderMission,
        searchCadre,
        getServiceCars
    } from '../controllers/orderMission.controller.js'

const router = express.Router();


router.get('/getOrderMission', getOrderMission)
router.get('/getServiceCars', getServiceCars)
router.post('/searchCadre', searchCadre)
router.post('/createOrderMission', createOrderMission)
router.get('/updateOrderMission', updateOrderMission)
router.get('/deleteOrderMission', deleteOrderMission)

export default router;