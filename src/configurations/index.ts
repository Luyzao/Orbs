import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

type Config = {
  ENV: string
  API_PORT:string
  
};

const config: Config = {
  ENV: publicRuntimeConfig.ENV,
  API_PORT: publicRuntimeConfig.API_PORT
  
};
export default config;
