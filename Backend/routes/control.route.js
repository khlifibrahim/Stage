import expres from 'express'
import {getControls, addControl, updateControls} from '../controllers/control.controller.js'

const router = expres.Router()

router.get('/list', getControls)
router.put('/update/:id', updateControls)
router.post('/add', addControl)
router.delete('/delete/:id', addControl)

export default router