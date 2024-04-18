"use server";
import { serverRequest } from "@/services/serverApi";
import { LangCode } from "@/models/management/cms/language.interface";
import { IPageContentDetailPerLangRs } from "@/models/management/cms/pageContent.interface";
import { BaseResponse } from "@/models/management/common.interface";

export const getPageContentDetail = async (payload?: {
    lang?: LangCode;
    slug?: string;
}) => {
    return await serverRequest.post<
        IPageContentDetailPerLangRs,
        BaseResponse<null>
    >("local/getCms_page_frontend", {
        headers: {
            Authorization: `Bearer ${encodeURIComponent(
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOiJ7XCJDb3JlVXNlclwiOntcIlJlY0lkXCI6MCxcIlVzZXJJZFwiOlwiXCIsXCJVc2VybmFtZVwiOlwiXCIsXCJQYXNzd29yZFwiOlwiXCIsXCJNYWluUm9sZVwiOlwiXCIsXCJNYWluUm9sZU5hbWVcIjpcIlwiLFwiRnVsbG5hbWVcIjpcIlwiLFwiRGVzY3JpcHRpb25zXCI6XCJcIn0sXCJMb2NhbFVzZXJcIjp7XCJSZWNJZFwiOjEsXCJVc2VySWRcIjpcIjk5XCIsXCJVc2VybmFtZVwiOlwiOTlcIixcIlBhc3N3b3JkXCI6XCJcIixcIk1haW5Sb2xlXCI6XCJGVUxMMTA4NDdcIixcIk1haW5Sb2xlTmFtZVwiOlwiU3VwcGVyIEFkbWluXCIsXCJGdWxsbmFtZVwiOlwiTkdVWUVOIFZBTiBBXCIsXCJEZXNjcmlwdGlvbnNcIjpcIlN1YnBlciBhZG1pbiBmdWxsIHF1eWVuXCJ9fSIsIm5iZiI6MTcxMzMyMjMzNiwiZXhwIjoxNzE0NjE4MzM2LCJpYXQiOjE3MTMzMjIzMzZ9.EIbO2EJfMgzmBN02wzvukgDZY7xPUT3pwIoaBX2C-Bw",
            )}`,
            "Content-Type": "application/json",
        },
        next: { tags: ["pageContent"] },
        params: {
            requestObject: {
                lang: payload?.lang,
                slug: payload?.slug,
            },
        },
    });
};
