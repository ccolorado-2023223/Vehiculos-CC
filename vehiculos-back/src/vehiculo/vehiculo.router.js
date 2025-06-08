import express from 'express';
import {
  getVehiculos,
  createVehiculo,
  updateVehiculo,
  deleteVehiculo,
}from './vehiculo.controller.js'
import { registerVehicle } from '../../middlewares/validators.js';

const router = express.Router()

router.get('/', getVehiculos)
router.post('/', registerVehicle, createVehiculo)
router.put('/:id', registerVehicle, updateVehiculo)
router.delete('/:id', deleteVehiculo)

export default router