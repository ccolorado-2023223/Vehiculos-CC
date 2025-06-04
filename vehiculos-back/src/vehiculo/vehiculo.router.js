import { Router } from 'express';
import * as controller from './vehiculo.controller.js';

const router = Router();

router.get('/', controller.getVehiculos);
router.post('/', controller.createVehiculo);
router.put('/:id', controller.updateVehiculo);
router.delete('/:id', controller.deleteVehiculo);

export default router;