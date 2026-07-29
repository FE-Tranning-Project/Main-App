import axios from 'axios';

// json-server default port is 3000
// Since we are running on emulator/device, we might need 10.0.2.2 (Android) or localhost (iOS).
// We'll use a placeholder that user can replace with their actual local IP if testing on a real device.
const API_URL = 'http://10.0.2.2:3000'; // For Android emulator default

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
