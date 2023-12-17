const config = {
    API_ROOT: process.env.API_ROOT,
    DOMAIN_ROOT: process.env.DOMAIN_ROOT || "http://localhost:3000",
    isMultipleLanguage: true,
};

export const mediaConfig = {
    depth: 2,
    accept: ".jpg, .jpeg, .png, .pdf, .svg, .docx, .xlsx, .gif",
    rootPath: "/uploads",
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
