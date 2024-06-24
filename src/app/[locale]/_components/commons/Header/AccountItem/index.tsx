import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

import CardDropdown from "./CardDropdown";
import PureClient from "@/components/admin/PureClient";
import { Button } from "antd";
export default async function AccountItem() {
    const session = await getServerSession(authOptions);

    return (
        <CardDropdown
            isAuth={!!session}
            username={session?.user.name}
        ></CardDropdown>
    );
}
