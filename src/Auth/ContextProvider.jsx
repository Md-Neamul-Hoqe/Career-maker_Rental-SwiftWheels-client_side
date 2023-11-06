import { useContext } from "react";
import { AuthContext } from "./AuthProviders";

const ContextProvider = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export default ContextProvider;
