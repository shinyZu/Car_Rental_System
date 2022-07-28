import axios from "../axios";

class RentalRequestService {
  getNoOfTotalRentalsForTheDay = async (date) => {
    let params = { total_rentals_for: date };
    const promise = new Promise((resolve, reject) => {
      axios
        .get("rentals", { params: params })
        .then((res) => {
          return resolve(res);
        })
        .catch((er) => {
          return resolve(er);
        });
    });
    return await promise;
  };

  getNoOfActiveRentalsForTheDay = async (date) => {
    let params = { active_rentals: date };
    const promise = new Promise((resolve, reject) => {
      axios
        .get("rentals", { params: params })
        .then((res) => {
          return resolve(res);
        })
        .catch((er) => {
          return resolve(er);
        });
    });
    return await promise;
  };

  getAllRequestDetails = async () => {
    const promise = new Promise((resolve, reject) => {
      axios
        .get("rentals/all_requests")
        .then((res) => {
          return resolve(res);
        })
        .catch((er) => {
          return resolve(er);
        });
    });
    return await promise;
  };

  acceptRental = async (data) => {
    const promise = new Promise((resolve, reject) => {
      axios
        .put("rentals/accept", data)
        .then((res) => {
          return resolve(res);
        })
        .catch((er) => {
          return resolve(er);
        });
    });
    return await promise;
  };

  denyRental = async (data) => {
    const promise = new Promise((resolve, reject) => {
      axios
        .put("rentals/deny", data)
        .then((res) => {
          return resolve(res);
        })
        .catch((er) => {
          return resolve(er);
        });
    });
    return await promise;
  };

  getAllRentalsToBeReturned = async () => {
    const promise = new Promise((resolve, reject) => {
      axios
        .get("rentals/get_returns")
        .then((res) => {
          return resolve(res);
        })
        .catch((er) => {
          return resolve(er);
        });
    });
    return await promise;
  };

  getInvoiceDetails = async (rental_id, reg_no) => {
    let params = { reg_no: reg_no };
    const promise = new Promise((resolve, reject) => {
      axios
        .get("rentals/" + rental_id, { params: params })
        .then((res) => {
          return resolve(res);
        })
        .catch((er) => {
          return resolve(er);
        });
    });
    return await promise;
  };

  getRentalDuration = async (rental_id) => {
    let params = { rental_id: rental_id };
    const promise = new Promise((resolve, reject) => {
      axios
        .get("rentals/duration", { params: params })
        .then((res) => {
          return resolve(res);
        })
        .catch((er) => {
          return resolve(er);
        });
    });
    return await promise;
  };

  calculateTotalPaymentForRental = async (rental_id) => {
    let params = { rental_id: rental_id };
    const promise = new Promise((resolve, reject) => {
      axios
        .get("rentals/calculate_total_rental_of", { params: params })
        .then((res) => {
          return resolve(res);
        })
        .catch((er) => {
          return resolve(er);
        });
    });
    return await promise;
  };

  calculateAmountToReturn = async (rental_id) => {
    let params = { rental_id: rental_id };
    const promise = new Promise((resolve, reject) => {
      axios
        .get("rentals/amount_to_return", { params: params })
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

export default new RentalRequestService();
