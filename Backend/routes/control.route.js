import expres from 'express'
import {getControls, addControl} from '../controllers/control.controller.js'

const router = expres.Router()

router.get('/list', getControls)
router.put('/update/:id', getControls)
router.post('/add', getControls)

export default router