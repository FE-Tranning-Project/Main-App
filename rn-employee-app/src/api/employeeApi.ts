import axiosClient from './axiosClient';
import { Employee } from 'ui-components';

const endpoint = '/employees';

export const employeeApi = {
  getAll: (): Promise<Employee[]> => {
    return axiosClient.get(endpoint);
  },
  getById: (id: string | number): Promise<Employee> => {
    return axiosClient.get(`${endpoint}/${id}`);
  },
  create: (data: Omit<Employee, 'id'>): Promise<Employee> => {
    return axiosClient.post(endpoint, data);
  },
  update: (id: string | number, data: Partial<Employee>): Promise<Employee> => {
    return axiosClient.put(`${endpoint}/${id}`, data);
  },
  delete: (id: string | number): Promise<void> => {
    return axiosClient.delete(`${endpoint}/${id}`);
  },
};
