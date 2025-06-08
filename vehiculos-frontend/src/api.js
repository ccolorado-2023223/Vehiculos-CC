import axios from 'axios';

const API = import.meta.env.VITE_API_URL + '/api/vehiculos';

export const getVehiculos = () => axios.get(API)
export const createVehiculo = (data) => axios.post(API, data)
export const updateVehiculo = (id, data) => axios.put(`${API}/${id}`, data)
export const deleteVehiculo = (id) => axios.delete(`${API}/${id}`)