import { useAuth } from "@clerk/clerk-react";

const API_BASE_URL = "http://localhost:5000/api";

export const useApi = () => {
  const { getToken } = useAuth();

  const request = async (method, endpoint, body = null) => {
    const token = await getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      ...(body && { "Content-Type": "application/json" }),
    };

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers,
      ...(body && { body: JSON.stringify(body) }),
    });

    return res.json();
  };

  return {
    getWithAuth: (endpoint) => request("GET", endpoint),
    postWithAuth: (endpoint, body) => request("POST", endpoint, body),
    patchWithAuth: (endpoint, body) => request("PATCH", endpoint, body),
  };
};
