import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useContextProvider from "./useContextProvider";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000/api/v1",
  baseURL: "https://ass-11-career-maker-server.vercel.app/api/v1",
  withCredentials: true,
});

const useAxios = () => {
  const { logOut } = useContextProvider();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (res) => {
        // console.log(res?.data);
        return res;
      },
      (error) => {
        console.log(error.response);

        if (error?.response.status === 401 || error?.response.status === 403) {
          console.log(error.message);
          logOut()
            .then(() => navigate("/login"))
            .catch((error) => console.log(error));

          Swal.fire({
            title: "Error",
            text: `${error.status}: ${error?.message}`,
            icon: "error",
          });
          Promise.reject(error);
          // return logOut();
        }
      }
    );
  }, [logOut, navigate]);

  return axiosInstance;
};

export default useAxios;
