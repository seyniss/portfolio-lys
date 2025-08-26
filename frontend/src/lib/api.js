import axios from "axios"

export const api = axios.create({
    saveURL:import.meta.env.VITE_API_URL,
    withCredentials:true
})