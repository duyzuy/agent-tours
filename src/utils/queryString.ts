export const updateQueryFromString = (
    queryString: string,
    { key, value }: { key: string; value: string },
) => {
    const querySearchKey = [`?${key}=`, `&${key}=`];

    const expWithValue = `(\\?${key}=|\\&${key}=)+[0-9]*[a-z]*`;
    const expNoValue = `(\\?${key}=|\\&${key}=)`;

    const regexWithValue = new RegExp(expWithValue, "g");
    const regexNoValue = new RegExp(expNoValue, "g");
    const resultValue = queryString.match(regexWithValue);
    const resultNoValue = queryString.match(regexNoValue);

    let updateQueryString = queryString;
    if (resultNoValue === null || resultValue === null) {
        updateQueryString =
            (queryString.includes("?") &&
                updateQueryString.concat("&", `${key}=${value}`)) ||
            updateQueryString.concat("?", `${key}=${value}`);
    } else {
        resultValue.forEach((keyVal, index) => {
            updateQueryString = updateQueryString.replace(
                keyVal,
                `${resultNoValue[index]}${value}`,
            );
        });
    }

    return updateQueryString;
};
