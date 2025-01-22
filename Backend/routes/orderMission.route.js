import express from 'express';
import { 
        getOrderMission, 
        createOrderMission, 
        updateOrderMission, 
        deleteOrderMission,
        getCarsAndCadres
    } from '../controllers/orderMission.controller.js'

const router = express.Router();

router.get('/getCarsAndCadres', getCarsAndCadres)
router.get('/getOrderMission', getOrderMission)
router.get('/createOrderMission', createOrderMission)
router.get('/updateOrderMission', updateOrderMission)
router.get('/deleteOrderMission', deleteOrderMission)

export default router;