"use client";
import { IconLogout } from "@/assets/icons";
import { signOut } from "next-auth/react";

interface SignOutButtonProps {
  title?: string;
}
const SignOutButton: React.FC<SignOutButtonProps> = ({ title }) => {
  return (
    <div className="py-3 px-3 hover:bg-gray-100 rounded-lg">
      <span className="text-gray-800 flex items-center cursor-pointer" onClick={() => signOut()}>
        <IconLogout className="mr-3 stroke-gray-800" />
        <span>{title}</span>
      </span>
    </div>
  );
};
export default SignOutButton;
