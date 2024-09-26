import axios from "axios";
import constants from "expo-constants";
const customAxios = axios.create({
  withCredentials: true,
  baseURL:
    constants.expoConfig?.extra &&
    constants.expoConfig.extra.ENV == "production"
      ? constants.expoConfig.extra.SERVER_PROD_URL + "/api"
      : constants.expoConfig.extra.SERVER_DEV_URL + "/api",
});
export default customAxios;
