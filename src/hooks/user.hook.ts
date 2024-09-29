import { useContext } from "react";
import { UserContext } from "../context/user.provider";

const useUserData = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("The hook must be used within user context provider!");
  }

  return context;
};

export default useUserData;
