import { getApiClient } from "../axios.clients";

export const getTeste = async () => {
    const clientApi = getApiClient();
    return await clientApi.get("/teste");
  };
  