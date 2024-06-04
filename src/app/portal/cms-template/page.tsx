"use client";
import React, { useEffect, useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import TableListPage from "@/components/admin/TableListPage";
import { useRouter } from "next/navigation";
import { LINKS } from "@/constants/links.constant";
import { useGetCMSTemplateListQuery } from "@/queries/cms/cmsTemplate";
import { columns, PageContentDataType } from "./columns";
import { useMemo } from "react";
import { CMSTemplateQueryParams } from "@/models/management/cms/cmsTemplate.interface";
import { LangCode } from "@/models/management/cms/language.interface";
import DrawerCMSTemplate from "./_components/DrawerCMSTemplate";
const CMSTemplatePage = () => {
    const router = useRouter();

    useEffect(() => {
        router.push(LINKS.CMSTemplatePageList);
    }, []);
    return null;
};
export default CMSTemplatePage;
