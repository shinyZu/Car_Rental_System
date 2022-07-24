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
}
export default new IncomeService();