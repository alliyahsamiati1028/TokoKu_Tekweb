import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // pastikan Laravel serve di port ini
  headers: {
    Accept: "application/json",
  },
});

export default apiClient;
