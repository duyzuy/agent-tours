import { BaseResponse } from "@/models/common.interface";
import { coreApi } from "../coreApi";
import { IInventoryTypeRs } from "@/models/management/core/inventoryType.interface";
export const inventoryTypeAPIs = {
    getAll: async () => {
        return await coreApi.post<IInventoryTypeRs, BaseResponse<null>>(
            "core/MiscInventoryType",
            {
                requestObject: {},
            },
        );
    },
};
