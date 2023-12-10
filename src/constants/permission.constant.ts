export enum ERolesFunctions {
    POST_LIST = "POST_LIST",
    POST_CREATE = "POST_CREATE",
    POST_UPDATE = "POST_UPDATE",
    POST_DELETE = "POST_DELETE",
    CATEGORY_LIST = "CATEGORY_LIST",
    CATEGORY_CREATE = "CATEGORY_CREATE",
    CATEGORY_UPDATE = "CATEGORY_UPDATE",
    CATEGORY_DELETE = "CATEGORY_DELETE",
    TAG_UPDATE = "TAG_UPDATE",
    TAG_CREATE = "TAG_CREATE",
    TAG_LIST = "TAG_LIST",
    TAG_DELETE = "TAG_DELETE",
    COMMENT_UPDATE = "COMMENT_UPDATE",
    COMMENT_CREATE = "COMMENT_CREATE",
    COMMENT_LIST = "COMMENT_LIST",
    COMMENT_DELETE = "COMMENT_DELETE",
    PROMOTION_UPDATE = "PROMOTION_UPDATE",
    PROMOTION_CREATE = "PROMOTION_CREATE",
    PROMOTION_LIST = "PROMOTION_LIST",
    PROMOTION_DELETE = "PROMOTION_DELETE",
    MENU_UPDATE = "MENU_UPDATE",
    MENU_CREATE = "MENU_CREATE",
    MENU_LIST = "MENU_LIST",
    MENU_DELETE = "MENU_DELETE",
    USER_UPDATE = "USER_UPDATE",
    USER_CREATE = "USER_CREATE",
    USER_LIST = "USER_LIST",
    USER_DELETE = "USER_DELETE",
    ROLE_UPDATE = "ROLE_UPDATE",
    ROLE_CREATE = "ROLE_CREATE",
    ROLE_LIST = "ROLE_LIST",
    ROLE_DELETE = "ROLE_DELETE",
    PERMISSION_UPDATE = "PERMISSION_UPDATE",
    PERMISSION_CREATE = "PERMISSION_CREATE",
    PERMISSION_LIST = "PERMISSION_LIST",
    PERMISSION_DELETE = "PERMISSION_DELETE",
    AGENT_UPDATE = "AGENT_UPDATE",
    AGENT_CREATE = "AGENT_CREATE",
    AGENT_LIST = "AGENT_LIST",
    AGENT_DELETE = "AGENT_DELETE",
    AGENTSTAFF_UPDATE = "AGENTSTAFF_UPDATE",
    AGENTSTAFF_CREATE = "AGENTSTAFF_CREATE",
    AGENTSTAFF_LIST = "AGENTSTAFF_LIST",
    AGENTSTAFF_DELETE = "AGENTSTAFF_DELETE",
    BOOKINGMANAGE_DETAIL = "BOOKINGMANAGE_DETAIL",
    BOOKINGMANAGE_CREATE = "BOOKINGMANAGE_CREATE",
    BOOKINGMANAGE_LIST = "BOOKINGMANAGE_LIST",
    BOOKINGMANAGE_DELETE = "BOOKINGMANAGE_DELETE",
    BOOKINGMANAGE_PAYMENT = "BOOKINGMANAGE_PAYMENT",
    BOOKINGMANAGE_ADD_ONS = "BOOKINGMANAGE_ADD_ONS",
    PRODUCT_UPDATE = "PRODUCT_UPDATE",
    PRODUCT_CREATE = "PRODUCT_CREATE",
    PRODUCT_LIST = "PRODUCT_LIST",
    PRODUCT_DELETE = "PRODUCT_DELETE",
    SSR_UPDATE = "SSR_UPDATE",
    SSR_CREATE = "SSR_CREATE",
    SSR_LIST = "SSR_LIST",
    SSR_DELETE = "SSR_DELETE",
    MEDIA_UPDATE = "MEDIA_UPDATE",
    MEDIA_CREATE = "MEDIA_CREATE",
    MEDIA_LIST = "MEDIA_LIST",
    MEDIA_DELETE = "MEDIA_DELETE",
    LANGUAGE_UPDATE = "LANGUAGE_UPDATE",
    LANGUAGE_CREATE = "LANGUAGE_CREATE",
    LANGUAGE_LIST = "LANGUAGE_LIST",
    LANGUAGE_DELETE = "LANGUAGE_DELETE",
    CURRENCY_UPDATE = "CURRENCY_UPDATE",
    CURRENCY_CREATE = "CURRENCY_CREATE",
    CURRENCY_LIST = "CURRENCY_LIST",
    CURRENCY_DELETE = "CURRENCY_DELETE",
    PAYMENTMETHOD_UPDATE = "PAYMENTMETHOD_UPDATE",
    PAYMENTMETHOD_CREATE = "PAYMENTMETHOD_CREATE",
    PAYMENTMETHOD_LIST = "PAYMENTMETHOD_LIST",
    PAYMENTMETHOD_DELETE = "PAYMENTMETHOD_DELETE",
    REGION_UPDATE = "REGION_UPDATE",
    REGION_CREATE = "REGION_CREATE",
    REGION_LIST = "REGION_LIST",
    REGION_DELETE = "REGION_DELETE",
    DASHBOARD_VIEW = "DASHBOARD_VIEW",
    SYSTEM_MANAGEMENT = "SYSTEM_MANAGEMENT",
}

export type TRoleCondition = (ERolesFunctions | { $or: TRoleCondition })[];

export const roleConfigs = {
    managePost: {
        list: [ERolesFunctions.POST_LIST],
        add: [ERolesFunctions.POST_CREATE],
        update: [ERolesFunctions.POST_UPDATE],
        delete: [ERolesFunctions.POST_DELETE],
    },
    manageCategory: {
        list: [ERolesFunctions.CATEGORY_LIST],
        add: [ERolesFunctions.CATEGORY_CREATE],
        update: [ERolesFunctions.CATEGORY_UPDATE],
        delete: [ERolesFunctions.CATEGORY_DELETE],
    },
    manageTag: {
        list: [ERolesFunctions.TAG_LIST],
        add: [ERolesFunctions.TAG_CREATE],
        update: [ERolesFunctions.TAG_UPDATE],
        delete: [ERolesFunctions.TAG_DELETE],
    },
    manageMedia: {
        list: [ERolesFunctions.MEDIA_LIST],
        add: [ERolesFunctions.MEDIA_CREATE],
        update: [ERolesFunctions.MEDIA_UPDATE],
        delete: [ERolesFunctions.MEDIA_DELETE],
    },
    comment: {
        list: [ERolesFunctions.COMMENT_LIST],
        add: [ERolesFunctions.COMMENT_CREATE],
        update: [ERolesFunctions.COMMENT_UPDATE],
        delete: [ERolesFunctions.COMMENT_DELETE],
    },
    promotion: {
        list: [ERolesFunctions.PROMOTION_LIST],
        add: [ERolesFunctions.PROMOTION_CREATE],
        update: [ERolesFunctions.PROMOTION_UPDATE],
        delete: [ERolesFunctions.PROMOTION_DELETE],
    },
    menu: {
        list: [ERolesFunctions.MENU_LIST],
        add: [ERolesFunctions.MENU_CREATE],
        update: [ERolesFunctions.MENU_UPDATE],
        delete: [ERolesFunctions.MENU_DELETE],
    },
    manageUser: {
        list: [ERolesFunctions.USER_LIST],
        add: [ERolesFunctions.USER_CREATE],
        update: [ERolesFunctions.USER_UPDATE],
        delete: [ERolesFunctions.USER_DELETE],
    },
    role: {
        list: [ERolesFunctions.ROLE_LIST],
        add: [ERolesFunctions.ROLE_CREATE],
        update: [ERolesFunctions.ROLE_UPDATE],
        delete: [ERolesFunctions.ROLE_DELETE],
    },
    permission: {
        list: [ERolesFunctions.PERMISSION_LIST],
        add: [ERolesFunctions.PERMISSION_CREATE],
        update: [ERolesFunctions.PERMISSION_UPDATE],
        delete: [ERolesFunctions.PERMISSION_DELETE],
    },
    agent: {
        list: [ERolesFunctions.AGENT_LIST],
        add: [ERolesFunctions.AGENT_CREATE],
        update: [ERolesFunctions.AGENT_UPDATE],
        delete: [ERolesFunctions.AGENT_DELETE],
    },
    agentStaff: {
        list: [ERolesFunctions.AGENTSTAFF_LIST],
        add: [ERolesFunctions.AGENTSTAFF_CREATE],
        update: [ERolesFunctions.AGENTSTAFF_UPDATE],
        delete: [ERolesFunctions.AGENTSTAFF_DELETE],
    },
    bookingManagement: {
        list: [ERolesFunctions.BOOKINGMANAGE_LIST],
        detail: [ERolesFunctions.BOOKINGMANAGE_DETAIL],
        add: [ERolesFunctions.BOOKINGMANAGE_CREATE],
        payment: [ERolesFunctions.BOOKINGMANAGE_PAYMENT],
        addOn: [ERolesFunctions.BOOKINGMANAGE_ADD_ONS],
        delete: [ERolesFunctions.BOOKINGMANAGE_DELETE],
    },
    product: {
        list: [ERolesFunctions.PRODUCT_LIST],
        add: [ERolesFunctions.PRODUCT_CREATE],
        update: [ERolesFunctions.PRODUCT_UPDATE],
        delete: [ERolesFunctions.PRODUCT_DELETE],
    },
    addon: {
        list: [ERolesFunctions.SSR_LIST],
        add: [ERolesFunctions.SSR_CREATE],
        update: [ERolesFunctions.SSR_UPDATE],
        delete: [ERolesFunctions.SSR_DELETE],
    },
    language: {
        list: [ERolesFunctions.SSR_LIST],
        add: [ERolesFunctions.SSR_CREATE],
        update: [ERolesFunctions.SSR_UPDATE],
        delete: [ERolesFunctions.SSR_DELETE],
    },
    currency: {
        list: [ERolesFunctions.CURRENCY_LIST],
        add: [ERolesFunctions.CURRENCY_CREATE],
        update: [ERolesFunctions.CURRENCY_UPDATE],
        delete: [ERolesFunctions.CURRENCY_DELETE],
    },
    paymentMethod: {
        list: [ERolesFunctions.PAYMENTMETHOD_LIST],
        add: [ERolesFunctions.PAYMENTMETHOD_CREATE],
        update: [ERolesFunctions.PAYMENTMETHOD_UPDATE],
        delete: [ERolesFunctions.PAYMENTMETHOD_UPDATE],
    },
    region: {
        list: [ERolesFunctions.REGION_LIST],
        add: [ERolesFunctions.REGION_CREATE],
        update: [ERolesFunctions.REGION_UPDATE],
        delete: [ERolesFunctions.REGION_DELETE],
    },
    dashboard: {
        view: [ERolesFunctions.DASHBOARD_VIEW],
    },
    systemConfig: {
        update: [ERolesFunctions.SYSTEM_MANAGEMENT],
    },
};

export const pathPermissions = {
    "/user": roleConfigs.manageUser.list,
    "/role-permission": roleConfigs.role.list,
    "/role": roleConfigs.role.list,
    "/menu": roleConfigs.menu.list,
    "/system-configuration": roleConfigs.systemConfig.update,
};
