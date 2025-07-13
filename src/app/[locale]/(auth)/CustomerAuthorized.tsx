import { authOptions } from "@/auth";
import { CLIENT_LINKS } from "@/constants/client/clientRouter.constant";
import { redirect } from "@/utils/navigation";
import { getServerSession } from "next-auth";
import { PropsWithChildren } from "react";
// import { getUserCustomerProfile } from "../customer/_actions/customer";

type CustomerAuthorizedProps = PropsWithChildren;
const CustomerAuthorized: React.FC<CustomerAuthorizedProps> = async ({ children }) => {
  const session = await getServerSession(authOptions);
  // const userData = await getUserCustomerProfile();

  if (!session) {
    redirect(`/${CLIENT_LINKS.CustomerLogin}`);
  }

  return <>{children}</>;
};
export default CustomerAuthorized;
