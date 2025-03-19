import axios from "axios";

// Set base URL for API requests
const API_URL = "http://localhost:5000/app";

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


export default instance;
