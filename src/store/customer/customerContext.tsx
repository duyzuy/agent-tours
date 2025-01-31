// "use client";
// import { createContext, useContext, useEffect, useReducer } from "react";
// import { customerReducer, initCustomerState } from "./customerReducer";
// import { CustomerAuthAction } from "./customerActions";
// import { useGetUserProfile } from "@/queries/fe/customer";
// import { signOut } from "next-auth/react";
// import { Session } from "next-auth";
// import useMessage from "@/hooks/useMessage";
// import { UserManagerData } from "./user.type";
// import { useAppManager, useAppSelector } from "../appContext";

// export const CustomerAuthContext = createContext<[UserManagerData, React.Dispatch<CustomerAuthAction>] | undefined>(
//   undefined,
// );

// export const CustomerProvider = ({ children, session }: { children: React.ReactNode; session?: Session | null }) => {
//   const [state, dispatch] = useReducer(customerReducer, initCustomerState);

//   const { data, isLoading } = useGetUserProfile({ enable: !!session, token: session?.user.accessToken });
//   const message = useMessage();

//   useEffect(() => {
//     if (session && !isLoading) {
//       if (data) {
//         dispatch({
//           type: "SET_PROFILE",
//           payload: data.result,
//         });
//       } else {
//         signOut({ redirect: true }).then((data) => {
//           message.info("Phiên đăng nhập hết hạn.");
//           console.log(data);
//         });
//       }
//     }
//   }, [data, isLoading, session]);

//   return <CustomerAuthContext.Provider value={[state, dispatch]}>{children}</CustomerAuthContext.Provider>;
// };

// export const useUserSelector = <T,>(selector: (state: UserManagerData) => T) => {
//   const userData = useContext(CustomerAuthContext);

//   if (!userData) {
//     throw new Error("Hook must use under user provider");
//   }
//   const [state, _] = userData;

//   return selector(state);
// };

// export const useUser = () => {
//   const context = useContext(CustomerAuthContext);

//   if (!context) {
//     throw new Error("Hook must use under CustomerProvider");
//   }

//   return context;
// };
