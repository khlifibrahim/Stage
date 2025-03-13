import expres from 'express'
import {fetchControls, createControl, updateControls, deleteControl} from '../controllers/control.controller.js'
import { getAllControls,getControlById, createControl24,updateControl,deleteControl24} from '../controllers/control24.controller.js'

const router = expres.Router()

router.get('/list', fetchControls)
router.put('/update/:id', updateControls)
router.post('/add', createControl)
router.delete('/delete/:id', deleteControl)

router.get('/24/list', getAllControls)
router.get('/24/list/:id', getControlById)
router.put('/24/update/:id', updateControls)
router.post('/24/add', createControl24)
router.put('/24/update/:id', updateControl)
router.delete('/24/delete/:id', deleteControl24)

export default router