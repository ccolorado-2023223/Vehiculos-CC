import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import vehiculoRoutes from './src/vehiculo/vehiculo.router.js';
dotenv.config()

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/vehiculos', vehiculoRoutes)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Servidor corriendo en: ${PORT}`)
})