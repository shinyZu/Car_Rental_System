import axios from "../axios";
import qs from "qs";

class CarService {
  getAllCars = async () => {
    const promise = new Promise((resolve, reject) => {
      axios
        .get("cars")
        .then((res) => {
          return resolve(res);
        })
        .catch((er) => {
          return resolve(er);
        });
    });
    return await promise;
  };

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

  updateCar = async (data) => {
    const promise = new Promise((resolve, reject) => {
      axios
        .put("cars", data)
        .then((res) => {
          return resolve(res);
        })
        .catch((er) => {
          return resolve(er);
        });
    });
    return await promise;
  };

  deleteCar = async (reg_no) => {
    let params = { reg_no: reg_no };
    const promise = new Promise((resolve, reject) => {
      axios
        .delete("cars", { params: params })
        .then((res) => {
          return resolve(res);
        })
        .catch((er) => {
          return resolve(er);
        });
    });
    return await promise;
  };

  getNoOfCarsByStatus = async (status) => {
    let params = { currentStatus: status };
    const promise = new Promise((resolve, reject) => {
      axios
        .get("cars/count_of", { params: params })
        .then((res) => {
          return resolve(res);
        })
        .catch((er) => {
          return resolve(er);
        });
    });
    return await promise;
  };

  updateCarStatus = async (data) => {
    const promise = new Promise((resolve, reject) => {
      axios
        .put("cars/status", data)
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
