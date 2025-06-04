import React, { useEffect, useState } from 'react';
import { getVehiculos, deleteVehiculo } from '../api.js';
import VehicleCard from '../component/VehiculoCard';
import VehicleForm from '../component/VehiculoForm';
import styled from 'styled-components';


export default function Home() {
  const [vehiculos, setVehiculos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadVehiculos = async () => {
    const res = await getVehiculos();
    setVehiculos(res.data);
  };

  const handleDelete = async (id) => {
    await deleteVehiculo(id);
    loadVehiculos();
  };

  const handleEdit = (vehiculo) => {
    setEditing(vehiculo);
    setShowForm(true);
  };

  const handleCreate = () => {
    setEditing(null);
    setShowForm(true);
  };

  useEffect(() => {
    loadVehiculos();
  }, []);

  return (
    <Container>
      <Button onClick={handleCreate}>Crear Vehículo</Button>
      {vehiculos.map((vehiculo) => (
        <VehicleCard
          key={vehiculo.id}
          vehiculo={vehiculo}
          onEdit={() => handleEdit(vehiculo)}
          onDelete={() => handleDelete(vehiculo.id)}
        />
      ))}
      {showForm && (
        <VehicleForm
          vehiculo={editing}
          onClose={() => setShowForm(false)}
          onRefresh={loadVehiculos}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem;
`;

const Button = styled.button`
  margin-bottom: 1rem;
`;