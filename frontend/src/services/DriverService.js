import axios from "../axios";

class DriverService {
  getNoOfDriversByStatus = async (status) => {
    let params = { currentStatus: status };
    const promise = new Promise((resolve, reject) => {
      axios
        .get("driver/count_of", { params: params })
        .then((res) => {
          return resolve(res);
        })
        .catch((er) => {
          return resolve(er);
        });
    });
    return await promise;
  };

  getSchedulesOfAllDrivers = async () => {
    const promise = new Promise((resolve, reject) => {
      axios
        .get("driver/driver_schedules")
        .then((res) => {
          return resolve(res);
        })
        .catch((er) => {
          return resolve(er);
        });
    });
    return await promise;
  };

  getAllDrivers = async () => {
    const promise = new Promise((resolve, reject) => {
      axios
        .get("driver")
        .then((res) => {
          return resolve(res);
        })
        .catch((er) => {
          return resolve(er);
        });
    });
    return await promise;
  };

  changeAssignedDriver = async (newDriver) => {
    let params = { changeDriverTo: newDriver };
    const promise = new Promise((resolve, reject) => {
      axios
        .get("rental_detail", { params: params })
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

export default new DriverService();
