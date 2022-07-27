import axios from "../axios";

class FileUploadService {
  uploadCustomerFiles = async (nic_no, data) => {
    console.log(data);

    const promise = new Promise((resolve, reject) => {
      axios
        .post("upload/customers", data, {
          params: { nic_no: nic_no },
        })
        .then((res) => {
          return resolve(res);
        })
        .catch((er) => {
          return resolve(er);
        });
    });
    return await promise;
  };

  uploadCarFiles = async (reg_no, fleet, brand, data) => {
    console.log(data);

    const promise = new Promise((resolve, reject) => {
      axios
        .post("upload/cars", data, {
          params: { reg_no: reg_no, fleet: fleet, brand: brand },
        })
        .then((res) => {
          return resolve(res);
        })
        .catch((er) => {
          return resolve(er);
        });
    });
    return await promise;
  };

  getCarFiles = async () => {
    const promise = new Promise((resolve, reject) => {
      axios
        .get("upload")
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

export default new FileUploadService();
//   params: { nic_no: nic_no },
/* {
    headers: { "Content-Type": "multipart/form-data" },
    params: { nic_no: nic_no }
} */
