import axios from "../axios";
import qs from "qs";

class CarService {
  saveCar = async (data) => {
    const promise = new Promise((resolve, reject) => {
      axios
        .post("cars", data)
        .then((res) => {
          return resolve(res);
        })
        .catch((er) => {
          return resolve(er);
        });
    });
    return await promise;
  };
}

export default new CarService();
