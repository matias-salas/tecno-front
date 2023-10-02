import axios from "./index";

class AuthApi {
  static Login = (data) => {
    return axios.post(`${base}/login`, data);
  };

  static Register = (data) => {
    return axios.post(`${base}/register`, data);
  };

  static Logout = (data) => {
    console.log(data);
    // replace the token with "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MywiZXhwIjoxNjk2NDc5NzM0fQ.zWe6Egi3s1AG5A2gG574I-VQmLuSLeDdnGL5TCVVIcc"
    return axios.post(`${base}/logout`, data, { headers: { Authorization: `${data.token}` } });
  };
}

let base = "users";

export default AuthApi;
