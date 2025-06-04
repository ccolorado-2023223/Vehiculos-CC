import axios from 'axios';

const API = 'http://localhost:5000/api/vehiculos';

export const getVehiculos = () => axios.get(API);
export const createVehiculo = (data) => axios.post(API, data);
export const updateVehiculo = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteVehiculo = (id) => axios.delete(`${API}/${id}`);