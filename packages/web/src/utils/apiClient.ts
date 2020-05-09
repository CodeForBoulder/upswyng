import axios from "axios";

const apiClient = axios.create({
  baseURL: (uri =>
    uri.charAt(uri.length - 1) === "/" ? `${uri}api` : `${uri}/api`)(
    process.env.REACT_APP_SERVER_URI || "http://localhost:3000"
  ),
  timeout: 15000,
});

export default apiClient;
