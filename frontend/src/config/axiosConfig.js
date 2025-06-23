import _axios from "axios";

const axios = _axios.create({
  baseURL: import.meta.env.viteURL,
  headers: { "Content-Type": "application/json" },
});

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("taag-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axios;
