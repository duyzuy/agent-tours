"use client";
import { useSession } from "next-auth/react";
const CustomerPage = () => {
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            // The user is not authenticated, handle it here.
            console.log("not loged");
        },
    });

    if (status === "loading") {
        return <>Loading...</>;
    }
    console.log(status);
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
