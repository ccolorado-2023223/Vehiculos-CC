import React, { useEffect, useState } from 'react';
import { getVehiculos, deleteVehiculo } from '../api.js';
import VehicleCard from '../component/VehiculoCard';
import VehicleForm from '../component/VehiculoForm';
import styled from 'styled-components';


export default function Home() {
  const [vehiculos, setVehiculos] = useState([])
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const loadVehiculos = async () => {
    const res = await getVehiculos()
    setVehiculos(res.data)
  };

  const handleDelete = async (id) => {
    await deleteVehiculo(id)
    loadVehiculos()
  };

  const handleEdit = (vehiculo) => {
    setEditing(vehiculo)
    setShowForm(true)
  };

  const handleCreate = () => {
    setEditing(null)
    setShowForm(true)
  };

  useEffect(() => {
    loadVehiculos();
  }, [])

  return (
    <PageWrapper>
      <Header>
        <Title>Registro de Vehículos</Title>
        <AddButton onClick={handleCreate}>+ Nuevo Vehículo</AddButton>
      </Header>

      <Grid>
        {vehiculos.map((vehiculo) => (
          <VehicleCard
            key={vehiculo.id}
            vehiculo={vehiculo}
            onEdit={() => handleEdit(vehiculo)}
            onDelete={() => handleDelete(vehiculo.id)}
          />
        ))}
      </Grid>

      {showForm && (
        <VehicleForm
          vehiculo={editing}
          onClose={() => setShowForm(false)}
          onRefresh={loadVehiculos}
        />
      )}
    </PageWrapper>
  )
}

const PageWrapper = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`

const Title = styled.h1`
  font-size: 1.8rem;
  color: #333;
  margin: 0 0 1rem 0;

  @media (min-width: 600px) {
    margin: 0;
  }
`

const AddButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`