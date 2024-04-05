const config = {
    API_ROOT: process.env.API_ROOT,
    DOMAIN_ROOT: process.env.DOMAIN_ROOT || "http://localhost:3000",
    LOCAL_API_URL:
        process.env.NODE_ENV === "production"
            ? "https://tours.frdev.asia/api" //"https://tours.frdev.asia/api"
            : "http://localhost:3000/api",
    isMultipleLanguage: true,
};

export const mediaConfig = {
    depth: 2,
    accept: ".jpg, .jpeg, .png, .pdf, .svg, .docx, .xlsx, .gif",
    rootPath: "/uploads",
    rootApiPath: `${
        process.env.NODE_ENV === "production"
            ? "https://tours.frdev.asia/api/uploads"
            : "http://localhost:3000/api/uploads"
    }`,
    rootFolder: "uploads",
    maxfileSize: 2, //mb 2,
    maxCount: 6, // number of file uploads
    fileType: {
        image: ["image/jpeg", "image/gif", "image/png"],
        icon: ["image/svg+xml"],
        file: [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ],
    },
};
export default config;

export const coreAccountConfig = {
    privateKey: "OiH3bdXyJun1iEFbNMpkqaVIPhTAa8JSVGwsbBXL",
    username: "admin",
    password: "test123",
    userId: "ANTHAI_DEMO",
};
