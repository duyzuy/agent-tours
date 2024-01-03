export const isSSR = () => {
    return typeof window === "undefined";
};
export const isExists = (obj: Object, key: string) => {
    if (typeof obj === "object") {
        return obj.hasOwnProperty(key);
    }
};

export const makeArrayFromLength = (length: number) => {
    if (typeof length !== "number") return;
    return Array.from({ length }, (_, i) => {
        return i;
    });
};

export const makeArrayFromNumber = (start: number, end: number) => {
    if (end < start) return;
    const length = end - start + 1;

    return Array.from({ length }, (_, index) => {
        return start + index;
    });
};

export const isEmpty = (obj: Object) => {
    if (typeof obj === "object") {
        if (Object.keys(obj).length !== 0) {
            return false;
        }
        return true;
    }
};

export const objectToQueryString = (obj: { [key: string]: any }) => {
    return Object.keys(obj).reduce((acc, key, _index) => {
        acc =
            _index === 0
                ? acc.concat(`${key}=`, obj[key].toString())
                : acc.concat(`&${key}=`, obj[key].toString());
        return acc;
    }, "");
};

export const removeVietnameseTones = (str: string) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(
        /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
        " ",
    );
    return str;
};

export const vietnameseTonesToUnderscoreKeyname = (str: string) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.split(" ").join("");
    // str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(
        /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|`|-|{|}|\||\\/g,
        "",
    );
    return str;
};

export const getFeeFromShortCode = ({
    str,
    key,
}: {
    str: string;
    key: string;
}) => {
    // const reg = /(max_fee|max_fee|percent\=\"[0-9]*\")/;
    const reg = new RegExp(`(${key}\=\"[0-9]*\")`, "i");
    const stringData = str.match(reg);

    if (stringData) {
        const val = stringData[0].substring(
            stringData[0].indexOf('"') + 1,
            stringData[0].lastIndexOf('"'),
        );

        if (!isNaN(Number(val))) {
            return Number(val);
        }
        return val;
    }

    return null;
};

const makeMoneyFormatter =
    ({
        sign = "$",
        delimiter = ",",
        decimal = ".",
        append = false,
        precision = 2,
        round = true,
        isShowCurrency = true,
    } = {}) =>
    (value: any) => {
        const e = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000];

        value = round
            ? Math.round(value * e[precision]) / e[precision]
            : parseFloat(value);

        const pieces = value.toFixed(precision).replace(".", decimal).split("");

        let ii = pieces.length - (precision ? precision + 1 : 0);

        while ((ii -= 3) > 0) {
            pieces.splice(ii, 0, delimiter);
        }

        let output = append
            ? pieces.join("") + " " + sign
            : sign + pieces.join("");
        if (!isShowCurrency) {
            output = pieces.join("");
        }
        return output;
    };

export const moneyFormatVND = makeMoneyFormatter({
    sign: "VND",
    precision: 0,
    append: true,
    isShowCurrency: true,
});

export const moneyFormatNoSymbol = makeMoneyFormatter({
    sign: "VND",
    precision: 0,
    append: true,
    isShowCurrency: false,
});

export const getLangeCode = (pathname: string) => {
    return pathname.split("/")[1];
};

export const stringSlashToCamelCase = (str: string) =>
    str.split("_").reduce((acc, word, _index) => {
        const firstChar =
            _index === 0
                ? word.charAt(0).toLowerCase()
                : word.charAt(0).toUpperCase();
        const rest = word.slice(1);

        acc = acc.concat(firstChar, rest);
        return acc;
    }, "");

export const generateStrings = (length = 8) => {
    let output = "";
    const str =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
        "abcdefghijklmnopqrstuvwxyz0123456789@#$";

    for (let i = 1; i <= length; i++) {
        let char = Math.floor(Math.random() * str.length + 1);

        output += str.charAt(char);
    }

    return output;
};
