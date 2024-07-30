"use client";
import React, { useState } from "react";
import { Collapse, CollapseProps } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import styled from "styled-components";
import MenuCustomLink, { MenuCustomLinkProps } from "../MenuCustomLink";
import MenuPageContentSelector, { MenuPageContentSelectorProps } from "../MenuPageContentSelector";
import { Locale } from "@/models/management/cms/language.interface";
import { MenuItemFormData, MenuItemPayload, MenuPositionType } from "@/models/management/cms/menu.interface";
import MenuDestinationSelector, { MenuDestinationSelectorProps } from "../MenuDestinationSelector";
import MenuVisaTemplateSelector from "../MenuVisaTemplateSelector";
import MenuTemplateContentSelector, { MenuTemplateContentSelectorProps } from "../MenuTemplateContentSelector";
import { useCreateMenuItemMutation } from "@/mutations/managements/menu";
import useCRUDMenu from "../../modules/useCRUDMenu";
import MenuCategorySelector, { MenuCategorySelectorProps } from "../MenuCategorySelector";
import MenuTagSelector, { MenuTagSelectorProps } from "../MenuTagSelector";

interface MenuTypeContainerProps {
  locale: Locale;
  menuPosition: MenuPositionType;
}
const MenuTypeContainer: React.FC<MenuTypeContainerProps> = ({ locale, menuPosition }) => {
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

  const handleAddMenuDestination: MenuDestinationSelectorProps["onAdd"] = (value, options) => {
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

  const handleAddMenuPage: MenuPageContentSelectorProps["onAdd"] = (value, options) => {
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

  const handleAddMenuVisaTemplate: MenuTemplateContentSelectorProps["onAdd"] = (value, options) => {
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

  const handleAddMenuCustomLink: MenuCustomLinkProps["onAdd"] = (values, cb) => {
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

  const handleAddMenuCategory: MenuCategorySelectorProps["onAdd"] = (values, options) => {
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

  const handleAddMenuTag: MenuTagSelectorProps["onAdd"] = (values, options) => {
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
      children: <MenuPageContentSelector locale={locale} menuPosition={menuPosition} onAdd={handleAddMenuPage} />,
    },
    {
      key: "destination",
      label: "Điểm đến",
      children: (
        <MenuDestinationSelector locale={locale} menuPosition={menuPosition} onAdd={handleAddMenuDestination} />
      ),
    },
    {
      key: "visaTemplate",
      label: "Visa template",
      children: (
        <MenuVisaTemplateSelector locale={locale} menuPosition={menuPosition} onAdd={handleAddMenuVisaTemplate} />
      ),
    },
    {
      key: "category",
      label: "Danh mục",
      children: <MenuCategorySelector locale={locale} menuPosition={menuPosition} onAdd={handleAddMenuCategory} />,
    },
    {
      key: "tag",
      label: "Thẻ bài viết",
      children: <MenuTagSelector locale={locale} menuPosition={menuPosition} onAdd={handleAddMenuTag} />,
    },
    // {
    //   key: "cmsTemplate",
    //   label: "CMS Template",
    //   children: (
    //     <MenuTemplateContentSelector locale={locale} menuPosition={menuPosition} onAdd={handleAddMenuCMSTemplate} />
    //   ),
    // },
    {
      key: "custom",
      label: "Liên kết tự tạo",
      children: <MenuCustomLink locale={locale} menuPosition={menuPosition} onAdd={handleAddMenuCustomLink} />,
    },
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
export default MenuTypeContainer;

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
