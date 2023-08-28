import axios from "axios";

const instance = axios.create({
  baseURL: "https://10.0.135.118:8000",
  headers: {
    accept: "application/json",
  },
});

export default instance;
