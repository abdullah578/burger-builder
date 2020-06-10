import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-builder-4ffaa.firebaseio.com/",
});

export default instance;
