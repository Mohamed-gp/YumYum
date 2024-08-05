import axios from "axios";

const env: string = "developement";
const customAxios = axios.create({
  baseURL:
    env == "production"
      ? "https://socialsync-qw94.onrender.com/api/"
      : "http://localhost:3000/api/",
  withCredentials: true,
});

export default customAxios;
