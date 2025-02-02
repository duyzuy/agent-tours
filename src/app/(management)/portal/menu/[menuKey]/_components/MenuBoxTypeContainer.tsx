"use client";
import React, { useState } from "react";
import { Collapse, CollapseProps } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import styled from "styled-components";

import { Locale } from "@/models/management/cms/language.interface";
import { MenuItemFormData, MenuItemPayload, MenuPositionType } from "@/models/management/cms/menu.interface";
import BoxCategoriesSelector, { BoxCategoriesSelectorProps } from "../../_components/BoxCategoriesSelector";
import BoxVisaListSelector, { BoxVisaListSelectorProps } from "../../_components/BoxVisaListSelector";
import BoxCustomLink, { BoxCustomLinkProps } from "../../_components/BoxCustomLink";
import BoxTagListSelector, { BoxTagListSelectorProps } from "../../_components/BoxTagListSelector";
import BoxDestinationListSelector, {
  BoxDestinationListSelectorProps,
} from "../../_components/BoxDestinationListSelector";
import BoxPageListSelector, { BoxPageListSelectorProps } from "../../_components/BoxPageListSelector";
import useCRUDMenu from "../../modules/useCRUDMenu";

interface MenuBoxTypeContainerProps {
  locale: Locale;
  menuPosition: MenuPositionType;
}
const MenuBoxTypeContainer: React.FC<MenuBoxTypeContainerProps> = ({ locale, menuPosition }) => {
  const { onCreate } = useCRUDMenu();
  const initItem = new MenuItemFormData(
    0,
    menuPosition,
    locale.key,
    "",
    "", // menuType
    "",
    "",
    "",
    "", // objectType
    "",
    0,
    "",
    false,
    0,
  );
  /**
   *
   * @param value
   * @param options
   * Add Destination to menu item
   *
   */

  const handleAddMenuDestination: BoxDestinationListSelectorProps["onAdd"] = (value, options) => {
    const payloadList = options.reduce<MenuItemPayload[]>((acc, opt) => {
      return [
        ...acc,
        {
          ...initItem,
          name: opt.title,
          thumb: opt.thumbnail?.original,
          objectSlug: opt.slug,
          objectId: opt.id,
          menuType: "templateType",
          objectType: "destination",
        },
      ];
    }, []);
    onCreate({ data: payloadList, position: menuPosition, lang: locale.key });
  };

  const handleAddMenuPage: BoxPageListSelectorProps["onAdd"] = (value, options) => {
    const payloadList = options.reduce<MenuItemPayload[]>((acc, opt) => {
      return [
        ...acc,
        {
          ...initItem,
          name: opt.name,
          thumb: opt.thumbnail?.original,
          objectSlug: opt.slug,
          objectId: opt.id,
          menuType: "templateType",
          objectType: "page",
        },
      ];
    }, []);
    onCreate({ data: payloadList, position: menuPosition, lang: locale.key });
  };

  // const handleAddMenuCMSTemplate: MenuTemplateContentSelectorProps["onAdd"] = (value, options) => {
  //   const payloadList = options.reduce<MenuItemPayload[]>((acc, opt) => {
  //     return [
  //       ...acc,
  //       {
  //         ...initItem,
  //         name: opt.name,
  //         thumb: opt.thumbnail?.original,
  //         objectSlug: opt.slug,
  //         objectId: opt.id,
  //         menuType: "templateType",
  //         objectType: "cmsTemplate",
  //       },
  //     ];
  //   }, []);
  //   onCreate({ data: payloadList, position: menuPosition, lang: locale.key });
  // };

  const handleAddMenuVisaTemplate: BoxVisaListSelectorProps["onAdd"] = (value, options) => {
    const payloadList = options.reduce<MenuItemPayload[]>((acc, opt) => {
      return [
        ...acc,
        {
          ...initItem,
          name: opt.name,
          thumb: opt.thumbnail?.original,
          objectSlug: opt.slug,
          objectId: opt.id,
          menuType: "templateType",
          objectType: "visaTemplate",
        },
      ];
    }, []);
    onCreate({ data: payloadList, position: menuPosition, lang: locale.key });
  };

  const handleAddMenuCustomLink: BoxCustomLinkProps["onAdd"] = (values, cb) => {
    const payloadList: MenuItemPayload[] = [
      {
        ...initItem,
        name: values.name,
        slug: values.slug,
        menuType: "custom",
        objectType: "custom",
      },
    ];

    onCreate({ data: payloadList, position: menuPosition, lang: locale.key }, cb);
  };

  const handleAddMenuCategory: BoxCategoriesSelectorProps["onAdd"] = (values, options) => {
    const payloadList = options.reduce<MenuItemPayload[]>((acc, opt) => {
      return [
        ...acc,
        {
          ...initItem,
          name: opt.name,
          thumb: opt.thumbnail?.original,
          objectSlug: opt.slug,
          objectId: opt.id,
          menuType: "templateType",
          objectType: "category",
        },
      ];
    }, []);

    onCreate({ data: payloadList, position: menuPosition, lang: locale.key });
  };

  const handleAddMenuTag: BoxTagListSelectorProps["onAdd"] = (values, options) => {
    const payloadList = options.reduce<MenuItemPayload[]>((acc, opt) => {
      return [
        ...acc,
        {
          ...initItem,
          name: opt.name,
          objectSlug: opt.slug,
          objectId: opt.id,
          menuType: "templateType",
          objectType: "tag",
        },
      ];
    }, []);

    onCreate({ data: payloadList, position: menuPosition, lang: locale.key });
  };

  const collapseItems: CollapseProps["items"] = [
    {
      key: "page",
      label: "Trang",
      children: <BoxPageListSelector locale={locale} menuPosition={menuPosition} onAdd={handleAddMenuPage} />,
    },
    {
      key: "destination",
      label: "Điểm đến",
      children: (
        <BoxDestinationListSelector locale={locale} menuPosition={menuPosition} onAdd={handleAddMenuDestination} />
      ),
    },
    {
      key: "visaTemplate",
      label: "Visa template",
      children: <BoxVisaListSelector locale={locale} menuPosition={menuPosition} onAdd={handleAddMenuVisaTemplate} />,
    },
    {
      key: "category",
      label: "Danh mục",
      children: <BoxCategoriesSelector locale={locale} menuPosition={menuPosition} onAdd={handleAddMenuCategory} />,
    },
    {
      key: "tag",
      label: "Thẻ bài viết",
      children: <BoxTagListSelector locale={locale} menuPosition={menuPosition} onAdd={handleAddMenuTag} />,
    },

    {
      key: "custom",
      label: "Liên kết tự tạo",
      children: <BoxCustomLink locale={locale} menuPosition={menuPosition} onAdd={handleAddMenuCustomLink} />,
    },
    // {
    //   key: "cmsTemplate",
    //   label: "CMS Template",
    //   children: (
    //     <MenuTemplateContentSelector locale={locale} menuPosition={menuPosition} onAdd={handleAddMenuCMSTemplate} />
    //   ),
    // },
  ];
  return (
    <div className="menu-list-type col-left links-type w-80">
      <div className="menu-list-type__header py-2 mb-4">
        <p className="font-bold">Loại liên kết</p>
      </div>
      <MenuTypeListCollapseStyled
        expandIconPosition="end"
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        items={collapseItems}
        defaultActiveKey={["page"]}
      />
    </div>
  );
};
export default MenuBoxTypeContainer;

const MenuTypeListCollapseStyled = styled(Collapse)`
  &&.travel-collapse {
    border-radius: 0;
    .travel-collapse-item {
      border-radius: 0;

      &:last-child {
        .travel-collapse-header {
          border-radius: 0;
        }
      }
      .travel-collapse-header-text {
        font-weight: bold;
      }
      .travel-collapse-header-text {
        font-weight: bold;
      }
    }
  }
`;
