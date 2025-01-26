import { useMutation, useQuery } from "@tanstack/react-query";

export const useTMutation = useMutation;
export const useTQuery = useQuery;

// function genCRUDQueryHooks(options: { name: string; hooks: { key: string; endpoint: string; fncApi: () => void }[] }) {
//   const { name, hooks } = options;
//   let output = {};

//   hooks.forEach((hook) => {

//     let hookName = `use${hook.key}${name}`;

//   });
// }
// const genCRUDHook = genCRUDQueryHooks({
//   name: "permission",
//   hooks: [
//     {
//       key: "create",
//       endpoint: "/",
//       fncApi: () => {},
//     },
//   ],
// });
