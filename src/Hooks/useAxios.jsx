import axios from "axios";
import Swal from "sweetalert2";
// import ContextProvider from "./ContextProvider";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

const useAxios = () => {
  
  // const { logOut } = ContextProvider();

  axiosInstance.interceptors.response.use(
    (res) => {
      // console.log(res?.data);
      return res;
    },
    (error) => {
      if (error?.status === 401 || error?.status === 403) {
        Swal.fire({
          title: "Error",
          text: error?.message,
          icon: "error",
        });
        // return logOut();
      }
    }
  );

  return axiosInstance;
};

export default useAxios;
