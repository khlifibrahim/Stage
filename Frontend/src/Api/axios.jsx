import axios from 'axios';

const Instance = axios.create({
    baseURL: 'http://khlifibrahim.me:3000/api'
})

export default Instance;