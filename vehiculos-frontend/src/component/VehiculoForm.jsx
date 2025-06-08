import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { createVehiculo, updateVehiculo } from '../api.js';

export default function VehicleForm({ vehiculo, onClose, onRefresh }) {
  const [form, setForm] = useState({
    marca: '', modelo: '', motor: '', placa: '', color: '', tracción: ''
  })
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (vehiculo) setForm(vehiculo);
  }, [vehiculo]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMessage('')
  };

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      if (vehiculo) {
        await updateVehiculo(vehiculo.id, form)
      } else {
        await createVehiculo(form)
      }
      onRefresh()
      onClose()
    } catch (error) {
      const msg = error.response?.data?.error || 'Error al guardar el vehículo';
      setErrorMessage(msg)
    }
  }

  return (
    <Overlay>
      <FormCard onSubmit={handleSubmit}>
        <h2>{vehiculo ? 'Editar Vehículo' : 'Registrar Vehículo'}</h2>
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        <FormGroup>
          <Input name="marca" value={form.marca} onChange={handleChange} placeholder="Marca" required />
          <Input name="modelo" value={form.modelo} onChange={handleChange} placeholder="Modelo" required />
          <Input name="motor" value={form.motor} onChange={handleChange} placeholder="Motor" required />
          <Input name="placa" value={form.placa} onChange={handleChange} placeholder="Placa" required />
          <Input name="color" value={form.color} onChange={handleChange} placeholder="Color" required />
          <Input name="tracción" value={form.tracción} onChange={handleChange} placeholder="Tracción" required />
        </FormGroup>
        <ButtonGroup>
          <SubmitButton type="submit">Guardar</SubmitButton>
          <CancelButton type="button" onClick={onClose}>Cancelar</CancelButton>
        </ButtonGroup>
      </FormCard>
    </Overlay>
  )
}

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`

const FormCard = styled.form`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
`

const ButtonGroup = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`

const SubmitButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`

const CancelButton = styled(SubmitButton)`
  background-color: #6c757d;

  &:hover {
    background-color: #5a6268;
  }
`

const ErrorText = styled.p`
  color: red;
  margin-bottom: 1rem;
  font-weight: bold;
`