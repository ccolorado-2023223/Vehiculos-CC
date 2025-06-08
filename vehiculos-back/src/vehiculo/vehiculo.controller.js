import connection from './vehiculo.model.js';
import { existPlate } from '../../utils/db.validators.js';

// Obtener todos los vehículos
export const getVehiculos = async (req, res) => {
  try {
    const [result] = await connection.query('SELECT * FROM vehiculos')
    res.json(result)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Crear un nuevo vehículo
export const createVehiculo = async (req, res) => {
  try {
    const { marca, modelo, motor, placa, color, tracción } = req.body

    await existPlate(placa)

    const [result] = await connection.query(
      'INSERT INTO vehiculos (marca, modelo, motor, placa, color, tracción) VALUES (?, ?, ?, ?, ?, ?)',
      [marca, modelo, motor, placa, color, tracción]
    )

    res.status(201).json({ id: result.insertId, marca, modelo, motor, placa, color, tracción })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Actualizar un vehículo
export const updateVehiculo = async (req, res) => {
  try {
    const id = req.params.id
    const { marca, modelo, motor, placa, color, tracción } = req.body;

    await existPlate(placa, Number(id))

    await connection.query(
      'UPDATE vehiculos SET marca = ?, modelo = ?, motor = ?, placa = ?, color = ?, tracción = ? WHERE id = ?',
      [marca, modelo, motor, placa, color, tracción, id]
    )

    res.status(200).json({ message: 'Vehículo actualizado correctamente' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Eliminar un vehículo
export const deleteVehiculo = async (req, res) => {
  try {
    await connection.query('DELETE FROM vehiculos WHERE id = ?', [req.params.id])
    res.json({ message: 'Vehículo eliminado' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
