import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProviders";

const useContextProvider = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export default useContextProvider;
