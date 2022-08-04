import axios from "../axios";

class CarFleetService {
  getLDWFeeByDescription = async (description, reg_no) => {
    let params = { description: description, reg_no: reg_no };
    const promise = new Promise((resolve, reject) => {
      axios
        .get("fleet/get_ldw", { params: params })
        .then((res) => {
          return resolve(res);
        })
        .catch((er) => {
          return resolve(er);
        });
    });
    return await promise;
  };

  getFleetByRegNo = async (reg_no) => {
    let params = { reg_no: reg_no };
    const promise = new Promise((resolve, reject) => {
      axios
        .get("fleet/getFleet", { params: params })
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

export default new CarFleetService();
