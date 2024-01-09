import { createHash } from "crypto";
export const createHash256 = (str: string) => {
    return createHash("sha256")
        .update(str, "utf-8")
        .digest("hex")
        .toLocaleUpperCase();
};
