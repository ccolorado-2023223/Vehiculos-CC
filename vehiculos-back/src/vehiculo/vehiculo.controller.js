import db from './vehiculo.model.js';

export const getVehiculos = (req, res) => {
  db.query('SELECT * FROM vehiculos', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// POST
export const createVehiculo = (req, res) => {
  const { marca, modelo, motor } = req.body;
  db.query(
    'INSERT INTO vehiculos (marca, modelo, motor) VALUES (?, ?, ?)',
    [marca, modelo, motor],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, marca, modelo, motor });
    }
  );
};

// PUT
export const updateVehiculo = (req, res) => {
  const { id } = req.params;
  const { marca, modelo, motor } = req.body;
  db.query(
    'UPDATE vehiculos SET marca = ?, modelo = ?, motor = ? WHERE id = ?',
    [marca, modelo, motor, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ id, marca, modelo, motor });
    }
  );
};

// DELETE
export const deleteVehiculo = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM vehiculos WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ id });
  });
};