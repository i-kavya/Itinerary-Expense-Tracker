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

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`API error: ${res.status} ${error}`);
    }

    // Avoid parsing JSON if the response body is empty (e.g., DELETE with no return body)
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return res.json();
    }

    return null;
  };

  return {
    getWithAuth: (endpoint) => request("GET", endpoint),
    postWithAuth: (endpoint, body) => request("POST", endpoint, body),
    patchWithAuth: (endpoint, body) => request("PATCH", endpoint, body),
    deleteWithAuth: (endpoint) => request("DELETE", endpoint),
  };
};
