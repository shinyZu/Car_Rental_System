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
}

export default new RentalRequestService();
