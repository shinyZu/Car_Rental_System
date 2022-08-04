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

  getAllUploadedImages = async () => {
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

  getAllFrontImages = async (brand, reg_no) => {
    let params = { reg_no: reg_no, brand: brand };
    const promise = new Promise((resolve, reject) => {
      axios
        .get("upload/front", { params: params })
        .then((res) => {
          return resolve(res);
        })
        .catch((er) => {
          return resolve(er);
        });
    });
    return await promise;
  };

  getCarImages = async (reg_no) => {
    let params = { reg_no: reg_no };
    const promise = new Promise((resolve, reject) => {
      axios
        .get("upload", { params: params })
        .then((res) => {
          return resolve(res);
        })
        .catch((er) => {
          return resolve(er);
        });
    });
    return await promise;
  };

  uploadProfilePic = async (nic_no, data) => {
    console.log(data);
    const promise = new Promise((resolve, reject) => {
      axios
        .post("upload/" + nic_no, data)
        .then((res) => {
          return resolve(res);
        })
        .catch((er) => {
          return resolve(er);
        });
    });
    return await promise;
  };

  getAvatar = async (nic_no) => {
    let params = { nic_no: nic_no };
    const promise = new Promise((resolve, reject) => {
      axios
        .get("upload/avatar", { params: params })
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
