import axios from 'axios';

export default axios.create({
    baseURL:
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:4000/api/'
            : '/api/',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});
