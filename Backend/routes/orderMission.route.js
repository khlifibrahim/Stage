import express from 'express';
import { 
        getOrderMission, 
        createOrderMission, 
        updateOrderMission, 
        deleteOrderMission,
        searchCadre,
        getServiceCars,
        getObjectOptions,
        getDestinations
    } from '../controllers/orderMission.controller.js'

const router = express.Router();


router.get('/getOrderMission', getOrderMission)
router.get('/getServiceCars', getServiceCars)
router.get('/getObjectOptions', getObjectOptions)
router.get('/getDestinations', getDestinations)
router.post('/searchCadre', searchCadre)
router.post('/createOrderMission', createOrderMission)
router.get('/updateOrderMission', updateOrderMission)
router.get('/deleteOrderMission', deleteOrderMission)

export default router;