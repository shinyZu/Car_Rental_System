import axios from "../axios";

class LoginService {
  loginUser = async (data) => {
    console.log(data);
    const promise = new Promise((resolve, reject) => {
      axios
        .post("login/user_login", data)
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

export default new LoginService();

// {
//     headers: { "Content-Type": "application/json" },
//   }
