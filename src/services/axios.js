import axios from "axios";

const instance = axios.create({
  baseURL: "https://192.168.43.52:8000",
  headers: {
    accept: "application/json",
  },
});

export default instance;
