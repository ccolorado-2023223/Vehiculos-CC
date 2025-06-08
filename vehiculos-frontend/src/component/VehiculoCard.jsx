import React from 'react';
import styled from 'styled-components';

export default function VehicleCard({ vehiculo, onEdit, onDelete }) {
  return (
    <Card>
      <h3>{vehiculo.marca} - {vehiculo.modelo}</h3>
      <p><strong>Motor:</strong> {vehiculo.motor}</p>
      <p><strong>Placa:</strong> {vehiculo.placa}</p>
      <p><strong>Color:</strong> {vehiculo.color}</p>
      <p><strong>Tracción:</strong> {vehiculo.tracción}</p>
      <ButtonGroup>
        <Button onClick={onEdit}>Editar</Button>
        <Button variant="delete" onClick={onDelete}>Eliminar</Button>
      </ButtonGroup>
    </Card>
  )
}


const Card = styled.div`
  background: #fff;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 180px;

  h3 {
    margin-bottom: 0.5rem;
    color: #333;
  }

  p {
    margin-bottom: 1rem;
    color: #555;
  }

  @media (max-width: 768px) {
    min-height: auto;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`

const Button = styled.button`
  background: ${({ variant }) => (variant === 'delete' ? '#dc3545' : '#007bff')};
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: ${({ variant }) => (variant === 'delete' ? '#c82333' : '#0056b3')};
  }
`