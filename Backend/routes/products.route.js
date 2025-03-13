import expres from 'express'
import {
    createProduit,
    getAllProduits,
    getProductById,
    updateProduit,
    deleteProduit,
    getProduitByFamille,
    createFamilleProduit,
    getAllFamilleProduits,
    getFamilleProduitById,
    updateFamilleProduit,
    deleteFamilleProduit
} from '../controllers/product.controller.js'

const router = expres.Router()

router.get('/product/list', getAllProduits)
router.post('/getproduct/:id', getProductById)
router.put('/product/update/:id', updateProduit)
router.post('/product/create', createProduit)
router.delete('/product/delete/:id', deleteProduit)

router.get('/familly/list', getAllFamilleProduits)
router.post('/familly/create', createFamilleProduit)
router.post('/familly/produit/:id', getFamilleProduitById)
router.put('/familly/update/:id', updateFamilleProduit)
router.delete('/familly/delete/:id', deleteFamilleProduit)

export default router