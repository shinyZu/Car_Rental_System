import axios from "../axios";
import qs from "qs";

class CustomerService {
  getAllCustomers = async () => {
    const promise = new Promise((resolve, reject) => {
      axios
        .get("customer")
        .then((res) => {
          return resolve(res);
        })
        .catch((er) => {
          return resolve(er);
        });
    });
    return await promise;
  };

  saveCustomer = async (data) => {
    const promise = new Promise((resolve, reject) => {
      axios
        .post("customer", qs.stringify(data))
        .then((res) => {
          return resolve(res);
        })
        .catch((er) => {
          return resolve(er);
        });
    });
    return await promise;
  };

  getCustomerCount = async () => {
    const promise = new Promise((resolve, reject) => {
      axios
        .get("customer/getCount")
        .then((res) => {
          return resolve(res);
        })
        .catch((er) => {
          return resolve(er);
        });
    });
    return await promise;
  };

  getCustomerByEmail = async (email) => {
    let params = { email: email };
    const promise = new Promise((resolve, reject) => {
      axios
        .get("customer", { params: params })
        .then((res) => {
          return resolve(res);
        })
        .catch((er) => {
          return resolve(er);
        });
    });
    return await promise;
  };

  updateCustomer = async (data) => {
    const promise = new Promise((resolve, reject) => {
      axios
        .put("customer", data)
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

export default new CustomerService();
