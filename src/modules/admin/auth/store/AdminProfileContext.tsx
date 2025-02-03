import { createContext } from "react";
import { ILocalUserProfile } from "@/models/management/localAuth.interface";

export const AdminProfileContext = createContext<ILocalUserProfile | undefined>(undefined);

const AdminProfileProvider = ({ children, profile }: { children: React.ReactNode; profile?: ILocalUserProfile }) => {
  return <AdminProfileContext.Provider value={profile}>{children}</AdminProfileContext.Provider>;
};
export { AdminProfileProvider };
