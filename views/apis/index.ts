import axios from "axios";

const api = axios.create({baseURL: "/.netlify/functions/server"})

export default api