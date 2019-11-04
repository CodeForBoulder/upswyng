import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://upswyng-server.herokuapp.com/api/",
  timeout: 10000,
});

export default apiClient;
