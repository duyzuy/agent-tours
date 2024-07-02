import { useSession } from "next-auth/react";
import { getCustomerProfile } from "./_actions/customer";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
const CustomerPage = async () => {
    const data = await getCustomerProfile();
    console.log(data);
    return (
        <div className="my-account py-8">
            <div className="container mx-auto px-3 md:px-6 lg:px-8">
                <div className="bg-white px-6 py-4">
                    <h1 className="text-3xl">My account</h1>
                </div>
            </div>
        </div>
    );
};
export default CustomerPage;
