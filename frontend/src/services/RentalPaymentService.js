import axios from "../axios";

class RentalPaymentService {
  calculatePaymentForEachCar = async (data) => {
    console.log(data);
    const promise = new Promise((resolve, reject) => {
      axios
        .post("rental_payment/calculate_rental", data)
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

export default new RentalPaymentService();
