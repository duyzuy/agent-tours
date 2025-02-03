import { useContext } from "react";

import { AdminProfileContext } from "../store/AdminProfileContext";

const useAdminProfile = () => {
  return useContext(AdminProfileContext);
};
export default useAdminProfile;
