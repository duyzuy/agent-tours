export interface IMedia {
    name: string;
    slug: string;
    type: "image" | "doc" | "folder" | "pdf";
}

export interface IMediaFolderPayload {
    folderName?: string;
    folderSlug?: string;
    parent?: string;
}
