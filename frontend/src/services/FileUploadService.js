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
}

export default new FileUploadService();
//   params: { nic_no: nic_no },
/* {
    headers: { "Content-Type": "multipart/form-data" },
    params: { nic_no: nic_no }
} */
