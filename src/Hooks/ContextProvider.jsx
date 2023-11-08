import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProviders";

const ContextProvider = () => {
  const contexts = useContext(AuthContext);
  return contexts;
};

export default ContextProvider;
