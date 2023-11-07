import axios from "axios";
// import ContextProvider from "./ContextProvider";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

const useAxios = () => {
//   const { logOut } = ContextProvider();

//   axiosInstance.interceptors.response.use(
//     (res) => {
//       console.log(res);
//       return res;
//     },
//     (error) => {
//       if (error.response.status === 401 || error.response.status === 403) {
//         console.log(error.response);
//         return logOut();
//       }
//     }
//   );

  return axiosInstance;
};

export default useAxios;
