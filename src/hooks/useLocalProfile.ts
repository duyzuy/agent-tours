import { useContext } from "react";
import { LocalUserProfileContext } from "@/context/localUserProfileContext";

const useLocalUserProfile = () => {
  return useContext(LocalUserProfileContext);
};
export default useLocalUserProfile;
