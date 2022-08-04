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

  getCarsToRepair = async (currentStatus) => {
    let params = { currentStatus: currentStatus };
    const promise = new Promise((resolve, reject) => {
      axios
        .get("cars/maintenance", { params: params })
        .then((res) => {
          return resolve(res);
        })
        .catch((er) => {
          return resolve(er);
        });
    });
    return await promise;
  };

  getMileage = async (reg_no) => {
    let params = { reg_no: reg_no };
    const promise = new Promise((resolve, reject) => {
      axios
        .get("rental_detail/mileage", { params: params })
        .then((res) => {
          return resolve(res);
        })
        .catch((er) => {
          return resolve(er);
        });
    });
    return await promise;
  };

  sortCarsByNoOfPassengers = async (passenger_count) => {
    let params = { passenger_count: passenger_count };
    const promise = new Promise((resolve, reject) => {
      axios
        .get("cars/by_passengers", { params: params })
        .then((res) => {
          return resolve(res);
        })
        .catch((er) => {
          return resolve(er);
        });
    });
    return await promise;
  };

  sortCarsByBrand = async (brand) => {
    let params = { brand: brand };
    const promise = new Promise((resolve, reject) => {
      axios
        .get("cars/by_brand", { params: params })
        .then((res) => {
          return resolve(res);
        })
        .catch((er) => {
          return resolve(er);
        });
    });
    return await promise;
  };

  sortCarsByFuelType = async (fuel_type) => {
    let params = { fuel_type: fuel_type };
    const promise = new Promise((resolve, reject) => {
      axios
        .get("cars/by_fuel_type", { params: params })
        .then((res) => {
          return resolve(res);
        })
        .catch((er) => {
          return resolve(er);
        });
    });
    return await promise;
  };

  sortCarsByTransmissionType = async (transmission_type) => {
    let params = { transmission_type: transmission_type };
    const promise = new Promise((resolve, reject) => {
      axios
        .get("cars/by_transmission_type", { params: params })
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
