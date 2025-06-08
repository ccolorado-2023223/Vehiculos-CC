import connection from '../src/vehiculo/vehiculo.model.js' // o donde tengas tu conexión

export const existPlate = async (placa, idVehiculo = null) => {
  const [rows] = await connection.query('SELECT * FROM vehiculos WHERE placa = ?', [placa])

  if (rows.length > 0) {
   
    if (!idVehiculo || rows[0].id !== idVehiculo) {
      throw new Error(`La placa del vehículo ${placa} ya está registrada`);
    }
  }
}