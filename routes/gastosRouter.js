import express from 'express';
import { addGasto, getGastos, updateGasto, deleteGasto } from '../controllers/gastosController.js';
const router = express.Router()

router.post('/gasto', addGasto)

router.get('/gastos', getGastos)

router.put('/gasto', updateGasto)

router.delete('/gasto', deleteGasto)

router.get('*', (req, res)=>{
res.send('404 - page not found')
})


export default router