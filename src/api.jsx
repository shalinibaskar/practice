import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const response = await axios.post(
        "http://localhost:5000/api/auth/refresh",
        {},
        {
          withCredentials: true,
        },
      );

      const newAccessToken = response.data.accessToken;

      localStorage.setItem("accessToken", newAccessToken);

      originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

      return api(originalRequest);
    }

    return Promise.reject(error);
  },
);

export default api;
