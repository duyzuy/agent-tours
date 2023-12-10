export const isPathRoute = (arr: string[], target: string) => {
    if (arr.every((r) => target.includes(r))) {
        return true;
    }

    return false;
};
