// export const GET_LOCAL_USER_ROLES = "GET_LOCAL_USER_ROLES";
export const GET_LOCAL_ROLE = "GET_LOCAL_ROLE";
export const GET_LOCAL_PERMISSION = "GET_LOCAL_PERMISSION";
export const GET_LOCAL_ROLE_PERMISSION = "GET_LOCAL_ROLE_PERMISSION";
export const GET_LOCAL_USER_LIST = "GET_LOCAL_USER_LIST";
export const GET_LOCAL_AGENT_LIST = "GET_LOCAL_AGENT_LIST";
export const GET_LOCAL_ROLE_GROUPS = "GET_LOCAL_ROLE_GROUPS";
export const GET_MEDIA_FOLDERS = "GET_MEDIA_FOLDERS";
export const GET_MEDIA_FILES = "GET_MEDIA_FILES";

export const queryCore = {
  GET_LIST_REGION: "GET_LIST_REGION",
  GET_INVENTORY_TYPE_LIST: "GET_INVENTORY_TYPE_LIST",
  GET_PRODUCT_TYPE_LIST: "GET_PRODUCT_TYPE_LIST",
  GET_INVENTORY_LIST: "GET_INVENTORY_LIST",
  GET_INVENTORY_DETAIL: "GET_INVENTORY_DETAIL",
  CREATE_INVENTORY_ITEM: "CREATE_INVENTORY_ITEM",
  GET_STOCK_INVENTORY_TYPE: "GET_STOCK_INVENTORY_TYPE",
  GET_STOCK_LIST_INVENTORY: "GET_STOCK_LIST_INVENTORY",
  GET_STOCK_DETAIL_INVENTORY: "GET_STOCK_DETAIL_INVENTORY",
  GET_LIST_TEMPLATE_SELLABLE: "GET_LIST_TEMPLATE_SELLABLE",
  GET_SELLABLE_LIST: "GET_SELLABLE_LIST",
  GET_SELLABLE_PRICE_CONFIGS: "GET_SELLABLE_PRICE_CONFIGS",
  GET_SELLABLE_DETAIL: "GET_SELLABLE_DETAIL",
  GET_BOOKING_ORDER_LIST: "GET_BOOKING_ORDER_LIST",
  GET_BOOKING_ORDER_DETAIL: "GET_BOOKING_ORDER_DETAIL",
  GET_PRODUCT_SERVICES_LIST: "GET_PRODUCT_SERVICES_LIST",
  GET_RULE_POLICY_DEPOSIT_CAT_LIST: "GET_RULE_POLICY_DEPOSIT_CAT_LIST",
  GET_RULE_POLICY_DEPOSIT_RULE_LIST: "GET_RULE_POLICY_DEPOSIT_RULE_LIST",
  GET_RULE_POLICY_LIMIT_TIME_CAT_LIST: "GET_RULE_POLICY_LIMIT_TIME_CAT_LIST",
  GET_RULE_POLICY_LIMIT_TIME_RULE_LIST: "GET_RULE_POLICY_LIMIT_TIME_RULE_LIST",

  GET_RULE_POLICY_PENALTY_CAT_LIST: "GET_RULE_POLICY_PENALTY_CAT_LIST",
  GET_RULE_POLICY_PENALTY_RULE_LIST: "GET_RULE_POLICY_PENALTY_RULE_LIST",
  GET_FORM_OF_PAYMENT_LIST: "GET_FORM_OF_PAYMENT_LIST",
  GET_DISCOUNT_POLICY_LIST: "GET_DISCOUNT_POLICY_LIST",
  GET_VENDOR_LIST: "GET_VENDOR_LIST",
  GET_VENDOR_DETAIL: "GET_VENDOR_DETAIL",
  GET_SUPPLIER_LIST: "GET_SUPPLIER_LIST",
  GET_SUPPLIER_DETAIL: "GET_SUPPLIER_DETAIL",
  GET_ROOMING_LIST: "GET_ROOMING_LIST",

  GET_OPERATION_LIST: "GET_OPERATION_LIST",
  GET_OPERATION_STATUS: "GET_OPERATION_STATUS",
  GET_OPERATION_DETAIL: "GET_OPERATION_DETAIL",
  GET_OPERATION_DEADLINE_DETAIL: "GET_OPERATION_DEADLINE_DETAIL",
  GET_OPERATION_DEADLINE_LIST: "GET_OPERATION_DEADLINE_LIST",
  GET_OPERATION_COSTING_LIST: "GET_OPERATION_COSTING_LIST",
  GET_OPERATION_COSTING_LIST_DETAIL: "GET_OPERATION_COSTING_LIST_DETAIL",
  GET_OPERATION_COSTING_LIST_DETAIL_ONE: "GET_OPERATION_COSTING_LIST_DETAIL_ONE",

  GET_OPERATION_THING_TODO_LIST: "GET_OPERATION_THING_TODO_LIST",

  GET_BOOKING_REQUEST_LIST: "GET_BOOKING_REQUEST_LIST",
  GET_BOOKING_REQUEST_DETAIL: "GET_BOOKING_REQUEST_DETAIL",

  GET_OPERATION_DUTY_LIST: "GET_OPERATION_DUTY_LIST",
} as const;

export const queryMisc = {
  GET_DESTINATION_LIST: "GET_DESTINATION_LIST",
  GET_DESTINATION_DETAIL: "GET_DESTINATION_DETAIL",
};

export const queryCMS = {
  GET_DESTINATION_CMS_LIST: "GET_DESTINATION_CMS_LIST",
  GET_DESTINATION_CMS_DETAIL: "GET_DESTINATION_CMS_DETAIL",
  GET_LOCAL_SEACH_DESTINATION: "GET_LOCAL_SEACH_DESTINATION",
  GET_LOCAL_RULE_AND_POLICY_LIST: "GET_LOCAL_RULE_AND_POLICY_LIST",
  GET_TRANSLATION_LIST_FE: "GET_TRANSLATION_LIST_FE",
  GET_PAGE_LIST: "GET_PAGE_LIST",
  GET_PAGE_MINIMAL_LIST: "GET_PAGE_MINIMAL_LIST",
  GET_PAGE_DETAIL: "GET_PAGE_DETAIL",
  GET_CMS_TEMPLATE_LIST: "GET_CMS_TEMPLATE_LIST",
  GET_CMS_TEMPLATE_SHORT_LIST: "GET_CMS_TEMPLATE_SHORT_LIST",
  GET_CMS_TEMPLATE_CONTENT_MINIMAL_LIST: "GET_CMS_TEMPLATE_CONTENT_MINIMAL_LIST",
  GET_CMS_TEMPLATE_DETAIL: "GET_CMS_TEMPLATE_DETAIL",
  GET_VISA_TEMPLATE_LIST: "GET_VISA_TEMPLATE_LIST",
  GET_VISA_TEMPLATE_DETAIL: "GET_VISA_TEMPLATE_DETAIL",
  GET_VISA_TEMPLATE_SHORT_LIST: "GET_VISA_TEMPLATE_SHORT_LIST",
  GET_VISA_TEMPLATE_CONTENT_SHORT_LIST: "GET_VISA_TEMPLATE_CONTENT_SHORT_LIST",
  GET_MENU_POSITION_LIST: "GET_MENU_POSITION_LIST",
  GET_TAG_LIST: "GET_TAG_LIST",
  GET_TAG_MINIMAL_LIST: "GET_TAG_MINIMAL_LIST",
  GET_TAG_DETAIL: "GET_TAG_DETAIL",
  GET_CATEGORY_LIST: "GET_CATEGORY_LIST",
  GET_CATEGORY_MINIMAL_LIST: "GET_CATEGORY_MINIMAL_LIST",
  GET_CATEGORY_DETAIL: "GET_CATEGORY_DETAIL",
  GET_CATEGORY_PARENT_LIST: "GET_CATEGORY_PARENT_LIST",
  GET_POST_CONTENT_LIST: "GET_POST_CONTENT_LIST",
  GET_POST_CONTENT_DETAIL: "GET_POST_CONTENT_DETAIL",
  GET_SETTING_EMAIL: "GET_SETTING_EMAIL",
  GET_TRAVEL_INFORMATION_NOTICE_LIST: "GET_TRAVEL_INFORMATION_NOTICE_LIST",
  GET_TRAVEL_INFORMATION_NOTICE_DETAIL: "GET_TRAVEL_INFORMATION_NOTICE_DETAIL",
  GET_LEADING_LIST: "GET_LEADING_LIST",
  GET_MISC_DOCUMENT_LIST: "GET_MISC_DOCUMENT_LIST",
  GET_MISC_DEPART_LOCATION_LIST: "GET_MISC_DEPART_LOCATION_LIST",
};

export const queryFE = {
  GET_TOUR_LIST: "GET_TOUR_LIST",
  GET_DESTINATIONS_SEARCH_CONFIG: "GET_DESTINATIONS_SEARCH_CONFIG",
  AUTH_CHECK_KEY_RESET_PASSWORD: "AUTH_CHECK_KEY_RESET_PASSWORD",
  CUSTOMER_PROFILE: "CUSTOMER_PROFILE",
};
