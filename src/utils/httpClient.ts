import axios from "axios";

export const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// ✅ REQUEST
httpClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// ✅ RESPONSE
httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("accessToken");

            // ❗ EVITE window.location.href
            // Isso reinicia o React inteiro

            // deixe o router cuidar disso futuramente
        }

        return Promise.reject(error);
    }
);
