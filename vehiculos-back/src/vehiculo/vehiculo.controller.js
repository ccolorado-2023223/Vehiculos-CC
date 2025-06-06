import db from './vehiculo.model.js';

export const getVehiculos = (req, res) => {
  db.query('SELECT * FROM vehiculos', (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

export const createVehiculo = (req, res) => {
  const { marca, modelo, motor, placa, color, tracción } = req.body;
  db.query(
    'INSERT INTO vehiculos (marca, modelo, motor, placa, color, tracción) VALUES (?, ?, ?, ?, ?, ?)',
    [marca, modelo, motor, placa, color, tracción],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, ...req.body });
    }
  );
};

export const updateVehiculo = (req, res) => {
  const { id } = req.params;
  const { marca, modelo, motor, placa, color, tracción } = req.body;
  db.query(
    'UPDATE vehiculos SET marca=?, modelo=?, motor=?, placa=?, color=?, tracción=? WHERE id=?',
    [marca, modelo, motor, placa, color, tracción, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Vehículo actualizado' });
    }
  );
};

export const deleteVehiculo = (req, res) => {
  db.query('DELETE FROM vehiculos WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Vehículo eliminado' });
  });
};