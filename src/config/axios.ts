import axios from 'axios';

export default axios.create({
    // baseURL: import.meta.env.VITE_BASE_URL,
    baseURL:  'https://not-note-backend.onrender.com',
    headers: {
        "Content-Type": "application/json",
    },
})