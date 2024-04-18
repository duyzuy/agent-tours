export const isEqualObject = <T extends object>(
    compKeys: (keyof T)[],
    obj?: T,
    target?: T,
): boolean => {
    // debugger;
    if (!target && !obj) {
        return true;
    }
    if ((!target && obj) || (!obj && target)) {
        return false;
    }
    if (target && obj) {
        return compKeys.every(
            (key) => obj[key as keyof T] === target[key as keyof T],
        );
    }
    return false;
};
