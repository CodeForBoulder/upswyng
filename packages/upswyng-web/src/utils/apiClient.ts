import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URI || "http://localhost:3000",
  timeout: 15000,
});

export default apiClient;
