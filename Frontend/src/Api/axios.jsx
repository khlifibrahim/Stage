import axios from 'axios';

const Instance = axios.create({
    // online: 'https://backend-zeta-liart-77.vercel.app/',
    // local: 'http://localhost:5000/api'

    baseURL : process.env.NODE_ENV === 'development' 
    ? 'https://backend-zeta-liart-77.vercel.app/'
    : 'http://localhost:5000/api'
})

export default Instance;