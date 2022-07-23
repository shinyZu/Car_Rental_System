import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/easycar/api/v1/",
  //header
  //timeout
});

export default instance;
