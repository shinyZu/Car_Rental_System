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
}

export default new DriverService();
