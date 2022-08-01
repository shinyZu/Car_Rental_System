import axios from "../axios";

class IncomeService {
  getDailyIncome = async (date) => {
    let params = { date: date };
    const promise = new Promise((resolve, reject) => {
      axios
        .get("rentals/daily_income", { params: params })
        .then((res) => {
          console.log(res);
          return resolve(res);
        })
        .catch((er) => {
          console.log(er);
          return resolve(er);
        });
    });
    return await promise;
  };

  calculateAnnualIncome = async () => {
    const promise = new Promise((resolve, reject) => {
      axios
        .get("rentals/annual_income")
        .then((res) => {
          // console.log(res);
          return resolve(res);
        })
        .catch((er) => {
          console.log(er);
          return resolve(er);
        });
    });
    return await promise;
  };

  calculateMonthlyIncome = async () => {
    const promise = new Promise((resolve, reject) => {
      axios
        .get("rentals/monthly_income")
        .then((res) => {
          console.log(res);
          return resolve(res);
        })
        .catch((er) => {
          console.log(er);
          return resolve(er);
        });
    });
    return await promise;
  };
}
export default new IncomeService();
