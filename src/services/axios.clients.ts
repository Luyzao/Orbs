import axios from "axios";
import config from "@/configurations";

export function getApiClient(ctx?: any) {
  const apiURL = `http://localhost:${config.API_PORT}/`;

  const api = axios.create({
    baseURL: `${apiURL}api/`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Force CORS header
    }
  });

  return api;
}
