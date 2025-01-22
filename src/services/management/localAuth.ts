import { getAgToken } from "@/utils/common";
import { client } from "../api";
import { ILocalUserProfileRs, ILocalUserProfilePayload } from "@/models/management/localAuth.interface";
import { RolesPermissionListResponse } from "@/models/management/rolePermission.interface";

// export const localAuthAPIs = {
//   // getRoles: async () => {
//   //   return await client.post<RolesPermissionListResponse>("local/CurrentUser_getRoles", {
//   //     headers: {
//   //       Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
//   //     },
//   //   });
//   // },
//   update: async (payload: ILocalUserProfilePayload) => {
//     return await client.post<ILocalUserProfileRs>("local/CurrentUser_updateInfo", {
//       headers: {
//         Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
//       },
//       params: {
//         requestObject: {
//           ...payload,
//         },
//       },
//     });
//   },
// };
