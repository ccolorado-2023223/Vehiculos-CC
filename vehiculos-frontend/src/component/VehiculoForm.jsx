import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { createVehiculo, updateVehiculo } from '../api.js';

export default function VehicleForm({ vehiculo, onClose, onRefresh }) {
  const [form, setForm] = useState({ marca: '', modelo: '', motor: '' });

  useEffect(() => {
    if (vehiculo) {
      setForm(vehiculo);
    }
  }, [vehiculo]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (vehiculo) {
      await updateVehiculo(vehiculo.id, form);
    } else {
      await createVehiculo(form);
    }
    onRefresh();
    onClose();
  };

  return (
    <Overlay>
      <FormCard>
        <h3>{vehiculo ? 'Editar' : 'Crear'} Vehículo</h3>
        <form onSubmit={handleSubmit}>
          <Input name="marca" value={form.marca} onChange={handleChange} placeholder="Marca" required />
          <Input name="modelo" value={form.modelo} onChange={handleChange} placeholder="Modelo" required />
          <Input name="motor" value={form.motor} onChange={handleChange} placeholder="Motor" required />
          <Button type="submit">Guardar</Button>
          <Button type="button" onClick={onClose}>Cancelar</Button>
        </form>
      </FormCard>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 400px;
`;

const Input = styled.input`
  display: block;
  margin-bottom: 1rem;
  width: 100%;
`;

const Button = styled.button`
  margin-right: 1rem;
`;
