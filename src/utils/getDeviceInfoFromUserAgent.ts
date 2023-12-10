export interface IDeviceInfo {
    browser:
        | "Chrome"
        | "GoogleBot"
        | "UCBrowser"
        | "Edge"
        | "Firefox"
        | "Safari"
        | "Opera"
        | "IE"
        | "Chromium"
        | "Unknown";
    os: "Android" | "Mac OS X" | "iOS" | "Unknown" | "Windows";
    osVersion: string;
    device: "mobile" | "desktop";
    version: string;
}

const getDeviceInfoFromUserAgent = (userAgent: string): IDeviceInfo => {
    const browserVersion = (userAgent: string, regex: RegExp) => {
        return userAgent.match(regex) ? userAgent.match(regex)![2] : "";
    };

    /*
     * Detect device
     */

    const isAndroid = () => Boolean(userAgent.match(/Android/i));
    const isIos = () => Boolean(userAgent.match(/iPhone|iPad|iPod/i));
    const isOpera = () => Boolean(userAgent.match(/Opera Mini/i));
    const isWindows = () => Boolean(userAgent.match(/IEMobile/i));

    const isMobile = () =>
        Boolean(isAndroid() || isIos() || isOpera() || isWindows());

    /*
     * Detect operator system
     */

    let os: IDeviceInfo["os"] = "Unknown";
    const clientStrings = [
        { s: "Windows 3.11", r: /Win16/ },
        { s: "Windows 95", r: /(Windows 95|Win95|Windows_95)/ },
        { s: "Windows ME", r: /(Win 9x 4.90|Windows ME)/ },
        { s: "Windows 98", r: /(Windows 98|Win98)/ },
        { s: "Windows CE", r: /Windows CE/ },
        { s: "Windows 2000", r: /(Windows NT 5.0|Windows 2000)/ },
        { s: "Windows XP", r: /(Windows NT 5.1|Windows XP)/ },
        { s: "Windows Server 2003", r: /Windows NT 5.2/ },
        { s: "Windows Vista", r: /Windows NT 6.0/ },
        { s: "Windows 7", r: /(Windows 7|Windows NT 6.1)/ },
        { s: "Windows 8.1", r: /(Windows 8.1|Windows NT 6.3)/ },
        { s: "Windows 8", r: /(Windows 8|Windows NT 6.2)/ },
        {
            s: "Windows NT 4.0",
            r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/,
        },
        { s: "Windows ME", r: /Windows ME/ },
        { s: "Android", r: /Android/ },
        { s: "Open BSD", r: /OpenBSD/ },
        { s: "Sun OS", r: /SunOS/ },
        { s: "Linux", r: /(Linux|X11)/ },
        { s: "iOS", r: /(iPhone|iPad|iPod)/ },
        { s: "Mac OS X", r: /Mac OS X/ },
        { s: "Mac OS", r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
        { s: "QNX", r: /QNX/ },
        { s: "UNIX", r: /UNIX/ },
        { s: "BeOS", r: /BeOS/ },
        { s: "OS/2", r: /OS\/2/ },
        {
            s: "Search Bot",
            r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/,
        },
    ];

    for (let _index in clientStrings) {
        let clientString = clientStrings[_index];
        if (clientString.r.test(userAgent)) {
            os = clientString.s as IDeviceInfo["os"];
            break;
        }
    }

    let osVersion = "Unknown";

    if (/Windows/.test(os)) {
        osVersion = /Windows (.*)/.exec(os)![1];
        os = "Windows" as IDeviceInfo["os"];
    }

    switch (os) {
        case "Mac OS X": {
            const searchOSX = /Mac OS X (10[\.\_\d]+)/.exec(userAgent);
            if (searchOSX) {
                osVersion = searchOSX![1];
            }
            break;
        }
        case "Android": {
            const searchAndroid = /Mac OS X (10[\.\_\d]+)/.exec(userAgent);
            if (searchAndroid) {
                osVersion = searchAndroid![1];
            }
            break;
        }

        case "iOS":
            const searchIOS = /OS (\d+)_(\d+)_?(\d+)?/.exec(userAgent);
            if (searchIOS) {
                osVersion = `${searchIOS[1]}.${searchIOS[2]}.${searchIOS[3]}`;
            }
            break;
    }

    /*
     * Detect browser name
     */

    let browser: IDeviceInfo["browser"] = "Unknown";

    browser = /ucbrowser/i.test(userAgent) ? "UCBrowser" : browser;
    browser = /edg/i.test(userAgent) ? "Edge" : browser;
    browser = /googlebot/i.test(userAgent) ? "GoogleBot" : browser;
    browser = /chromium/i.test(userAgent) ? "Chromium" : browser;
    browser =
        /firefox|fxios/i.test(userAgent) && !/seamonkey/i.test(userAgent)
            ? "Firefox"
            : browser;
    browser =
        /; msie|trident/i.test(userAgent) && !/ucbrowser/i.test(userAgent)
            ? "IE"
            : browser;
    browser =
        /chrome|crios/i.test(userAgent) &&
        !/opr|opera|chromium|edg|ucbrowser|googlebot/i.test(userAgent)
            ? "Chrome"
            : browser;
    browser =
        /safari/i.test(userAgent) &&
        !/chromium|edg|ucbrowser|chrome|crios|opr|opera|fxios|firefox/i.test(
            userAgent,
        )
            ? "Safari"
            : browser;
    browser = /opr|opera/i.test(userAgent) ? "Opera" : browser;

    /*
     *   Detect browser version
     */
    let version = "unknown";
    switch (browser) {
        case "UCBrowser":
            version = browserVersion(userAgent, /(ucbrowser)\/([\d\.]+)/i);
            break;
        case "Edge":
            version = browserVersion(
                userAgent,
                /(edge|edga|edgios|edg)\/([\d\.]+)/i,
            );
            break;
        case "GoogleBot":
            version = browserVersion(userAgent, /(googlebot)\/([\d\.]+)/i);
            break;
        case "Chromium":
            version = browserVersion(userAgent, /(chromium)\/([\d\.]+)/i);
            break;
        case "Firefox":
            version = browserVersion(userAgent, /(firefox|fxios)\/([\d\.]+)/i);
            break;
        case "Chrome":
            version = browserVersion(userAgent, /(chrome|crios)\/([\d\.]+)/i);
            break;
        case "Safari":
            version = browserVersion(userAgent, /(safari)\/([\d\.]+)/i);
            break;
        case "Opera":
            version = browserVersion(userAgent, /(opera|opr)\/([\d\.]+)/i);
            break;
        case "IE":
            {
                const ieVersion = browserVersion(
                    userAgent,
                    /(trident)\/([\d\.]+)/i,
                );
                version = "7.0";
                // IE version is mapped using trident version
                if (ieVersion) {
                    version = (parseFloat(ieVersion) + 4.0).toString();
                }
            }
            break;
    }

    return {
        device: isMobile() ? "mobile" : "desktop",
        browser,
        os,
        osVersion: osVersion,
        version,
    };
};

export default getDeviceInfoFromUserAgent;
