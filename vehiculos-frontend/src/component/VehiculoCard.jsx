import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 1rem;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  margin-right: 0.5rem;
`;

export default function VehicleCard({ vehiculo, onEdit, onDelete }) {
  return (
    <Card>
      <h3>{vehiculo.marca} - {vehiculo.modelo}</h3>
      <p>Motor: {vehiculo.motor}</p>
      <Button onClick={onEdit}>Editar</Button>
      <Button onClick={onDelete}>Eliminar</Button>
    </Card>
  );
}