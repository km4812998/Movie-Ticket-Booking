import axios from 'axios';

// Create an axios instance with a base URL and default headers
export const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}` 
    }
});
