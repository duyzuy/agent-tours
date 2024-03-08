import { useCallback, useEffect, useMemo, useState } from "react";
import {
    Drawer,
    Space,
    Button,
    Form,
    Input,
    Checkbox,
    Tooltip,
    Switch,
    SwitchProps,
} from "antd";

import { InfoCircleOutlined } from "@ant-design/icons";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import {
    IStateProvinceListRs,
    IDestinationPayload,
    DestinationFormData,
    IDestinationListRs,
} from "@/models/management/region.interface";

import FormItem from "@/components/base/FormItem";
import { vietnameseTonesToUnderscoreKeyname } from "@/utils/helper";
import { isEmpty, isEqual } from "lodash";
import { Status } from "@/models/management/common.interface";

export enum EActionType {
    CREATE = "create",
    EDIT = "edit",
}
export type TDrawlerCreateAction = {
    action: EActionType.CREATE;
};
export type TDrawlerEditAction = {
    action: EActionType.EDIT;
    record: IDestinationListRs["result"][0];
};
export type TDrawlerDestination = TDrawlerEditAction | TDrawlerCreateAction;

type TStateProvinceGrouping = IStateProvinceListRs["result"][0] & {
    children: TStateProvinceGrouping[];
};
interface DrawlerRoleProps {
    isOpen?: boolean;
    onClose: () => void;
    actionType?: EActionType;
    onUpdateStatus: (id: number, status: Status.OK | Status.OX) => void;
    initialValues?: IDestinationListRs["result"][0];
    onSubmit?: (actionType: EActionType, data: IDestinationPayload) => void;
    items: IStateProvinceListRs["result"];
    errors?: any;
}
const DrawlerDestination: React.FC<DrawlerRoleProps> = ({
    isOpen,
    onClose,
    actionType = EActionType.CREATE,
    onSubmit,
    items,
    initialValues,
    errors,
    onUpdateStatus,
}) => {
    const initFormData = new DestinationFormData("", "", []);

    const [formData, setFormData] = useState<IDestinationPayload>(initFormData);

    const provincesGrouping = useMemo(() => {
        const itemMap = items.reduce<{
            [key: string]: IStateProvinceListRs["result"];
        }>((acc, item) => {
            acc = {
                ...acc,
                [item.cat]: [...(acc[item.cat] ? acc[item.cat] : []), item],
            };
            return acc;
        }, {});

        let output: TStateProvinceGrouping[] = [];

        itemMap["REGIONLIST"]?.forEach((region) => {
            let childsOfRegion: TStateProvinceGrouping[] = [];
            let restOfChildRegion: IStateProvinceListRs["result"] = [];
            itemMap["SUBREGIONLIST"].forEach((subRegion) => {
                if (subRegion.regionKey === region.regionKey) {
                    let countries: TStateProvinceGrouping[] = [];
                    let restCountries: IStateProvinceListRs["result"] = [];
                    itemMap["COUNTRYLIST"].forEach((country) => {
                        if (
                            country.regionKey === region.regionKey &&
                            country.subRegionKey === subRegion.subRegionKey
                        ) {
                            let states: TStateProvinceGrouping[] = [];
                            let restStates: IStateProvinceListRs["result"] = [];

                            itemMap["STATEPROVINCELIST"].forEach((state) => {
                                if (
                                    state.regionKey === region.regionKey &&
                                    state.subRegionKey ===
                                        subRegion.subRegionKey &&
                                    state.countryKey === country.countryKey
                                ) {
                                    states = [
                                        ...states,
                                        { ...state, children: [] },
                                    ];
                                } else {
                                    restStates = [...restStates, state];
                                }
                            });

                            countries = [
                                ...countries,
                                { ...country, children: states },
                            ];
                            itemMap["STATEPROVINCELIST"] = restStates;
                        } else {
                            restCountries = [...restCountries, country];
                        }
                    });

                    childsOfRegion = [
                        ...childsOfRegion,
                        { ...subRegion, children: countries },
                    ];
                } else {
                    restOfChildRegion = [...restOfChildRegion, subRegion];
                }
            });
            itemMap["SUBREGIONLIST"] = restOfChildRegion;
            const regionItem: TStateProvinceGrouping = {
                ...region,
                children: childsOfRegion,
            };

            output = [...output, regionItem];
        });
        return output;
    }, [items]);

    const getIndex = (
        value: IStateProvinceListRs["result"][0],
        values: IStateProvinceListRs["result"],
    ) => {
        return values.findIndex(
            (item) =>
                item.regionKey === value.regionKey &&
                item.subRegionKey === value.subRegionKey &&
                item.countryKey === value.countryKey &&
                item.stateProvinceKey === value.stateProvinceKey,
        );
    };

    const onChangeState = (
        ev: CheckboxChangeEvent,
        state: TStateProvinceGrouping,
    ) => {
        let newList = [...formData.listStateProvince];

        const regionOfState = items.find(
            (item) =>
                item.regionKey === state.regionKey && item.cat === "REGIONLIST",
        );
        const subRegionOfState = items.find(
            (item) =>
                item.subRegionKey === state.subRegionKey &&
                item.cat === "SUBREGIONLIST",
        );

        const countryOfState = items.find(
            (item) =>
                item.countryKey === state.countryKey &&
                item.cat === "COUNTRYLIST",
        );

        if (!ev.target.checked) {
            const indexItem = getIndex(state, formData.listStateProvince);

            if (indexItem !== -1) {
                newList.splice(indexItem, 1);
            }
            if (countryOfState) {
                const indexCountry = getIndex(countryOfState, newList);

                if (indexCountry !== -1) {
                    newList.splice(indexCountry, 1);
                }
            }
            if (subRegionOfState) {
                const indexOfSubRegion = getIndex(subRegionOfState, newList);

                if (indexOfSubRegion !== -1) {
                    newList.splice(indexOfSubRegion, 1);
                }
            }
            if (regionOfState) {
                const indexOfRegion = getIndex(regionOfState, newList);

                if (indexOfRegion !== -1) {
                    newList.splice(indexOfRegion, 1);
                }
            }
        } else {
            const { children, ...restOfStates } = state;

            const rootRegionLengthOfState = items.filter(
                (item) => item.regionKey === state.regionKey,
            ).length;
            const currentRegionLenghOfState = formData.listStateProvince.filter(
                (item) => item.regionKey === state.regionKey,
            ).length;

            const rootSubRegionLength = items.filter(
                (item) =>
                    item.regionKey === state.regionKey &&
                    item.subRegionKey === state.subRegionKey,
            ).length;
            const currentSubRegionLengh = formData.listStateProvince.filter(
                (item) =>
                    item.regionKey === state.regionKey &&
                    item.subRegionKey === state.subRegionKey,
            ).length;

            const rootCountryLengthOfState = items.filter(
                (item) =>
                    item.regionKey === state.regionKey &&
                    item.subRegionKey === state.subRegionKey &&
                    item.countryKey === state.countryKey,
            ).length;
            const currentCountryLenghOfState =
                formData.listStateProvince.filter(
                    (item) =>
                        item.regionKey === state.regionKey &&
                        item.subRegionKey === state.subRegionKey &&
                        item.countryKey === state.countryKey,
                ).length;

            if (
                rootRegionLengthOfState === currentRegionLenghOfState + 4 &&
                regionOfState &&
                subRegionOfState &&
                countryOfState
            ) {
                newList = [
                    ...newList,
                    { ...regionOfState },
                    { ...subRegionOfState },
                    { ...countryOfState },
                    restOfStates,
                ];
            } else if (
                rootSubRegionLength === currentSubRegionLengh + 3 &&
                rootRegionLengthOfState !== currentRegionLenghOfState + 4 &&
                subRegionOfState &&
                countryOfState
            ) {
                newList = [
                    ...newList,
                    { ...subRegionOfState },
                    { ...countryOfState },
                    restOfStates,
                ];
            } else if (
                rootCountryLengthOfState === currentCountryLenghOfState + 2 &&
                rootSubRegionLength !== currentSubRegionLengh + 3 &&
                rootRegionLengthOfState !== currentRegionLenghOfState + 4 &&
                countryOfState
            ) {
                newList = [...newList, { ...countryOfState }, restOfStates];
            } else {
                newList = [...newList, { ...restOfStates }];
            }
        }

        setFormData((prev) => ({
            ...prev,
            listStateProvince: [...newList],
        }));
    };

    const onChangeRegion = (
        ev: CheckboxChangeEvent,
        region: TStateProvinceGrouping,
    ) => {
        let newList = [...formData.listStateProvince];

        const currentChidsKeys = formData.listStateProvince.reduce<number[]>(
            (acc, item) => {
                if (item.regionKey === region.regionKey) {
                    acc = [...acc, item.recId];
                }
                return acc;
            },
            [],
        );
        const childItemsOfRegion = items.filter(
            (item) => item.regionKey === region.regionKey,
        );
        if (!ev.target.checked) {
            childItemsOfRegion.forEach((item) => {
                const indexItem = getIndex(item, newList);

                if (indexItem !== -1) {
                    newList.splice(indexItem, 1);
                }
            });
        } else {
            const excerptRestChildsOfRegion = childItemsOfRegion.filter(
                (item) =>
                    item.regionKey === region.regionKey &&
                    !currentChidsKeys.includes(item.recId),
            );

            newList = [...newList, ...excerptRestChildsOfRegion];
        }
        setFormData((prev) => ({
            ...prev,
            listStateProvince: [...newList],
        }));
    };

    const onChangeSubRegion = (
        ev: CheckboxChangeEvent,
        subRegion: TStateProvinceGrouping,
    ) => {
        let newList = [...formData.listStateProvince];
        const childItemsOfSubRegion = items.filter(
            (item) =>
                item.regionKey === subRegion.regionKey &&
                item.subRegionKey === subRegion.subRegionKey,
        );

        const currentChildItemsOfSubRegion = formData.listStateProvince.reduce<
            number[]
        >((acc, item) => {
            if (
                item.regionKey === subRegion.regionKey &&
                item.subRegionKey === subRegion.subRegionKey
            ) {
                acc = [...acc, item.recId];
            }
            return acc;
        }, []);

        const regionOfSubRegion = items.find(
            (item) =>
                item.regionKey === subRegion.regionKey &&
                item.cat === "REGIONLIST",
        );

        if (!ev.target.checked) {
            childItemsOfSubRegion.forEach((item) => {
                const indexItem = getIndex(item, newList);

                if (indexItem !== -1) {
                    newList.splice(indexItem, 1);
                }
            });
            if (regionOfSubRegion) {
                const indexItem = getIndex(regionOfSubRegion, newList);
                if (indexItem !== -1) {
                    newList.splice(indexItem, 1);
                }
            }
        } else {
            const rootSubRegionLengthOfRegion = items.filter(
                (item) => item.regionKey === subRegion.regionKey,
            ).length;

            const excerptChildOfRegion = childItemsOfSubRegion.filter(
                (item) => !currentChildItemsOfSubRegion.includes(item.recId),
            );

            const currentSubRegionLenghOfRegion =
                formData.listStateProvince.filter(
                    (item) => item.regionKey === subRegion.regionKey,
                ).length;

            if (
                rootSubRegionLengthOfRegion ===
                    currentSubRegionLenghOfRegion +
                        excerptChildOfRegion.length +
                        1 &&
                regionOfSubRegion
            ) {
                newList = [
                    ...newList,
                    { ...regionOfSubRegion },
                    ...excerptChildOfRegion,
                ];
            } else {
                newList = [...newList, ...excerptChildOfRegion];
            }
        }
        setFormData((prev) => ({
            ...prev,
            listStateProvince: [...newList],
        }));
    };

    const onChangeCountry = (
        ev: CheckboxChangeEvent,
        country: TStateProvinceGrouping,
    ) => {
        let newList = [...formData.listStateProvince];
        const childItemsOfCountry = items.filter(
            (item) =>
                item.regionKey === country.regionKey &&
                item.subRegionKey === country.subRegionKey &&
                item.countryKey === country.countryKey,
        );

        const currentChildItemsOfCountry = formData.listStateProvince.reduce<
            number[]
        >((acc, item) => {
            if (
                item.regionKey === country.regionKey &&
                item.subRegionKey === country.subRegionKey &&
                item.countryKey === country.countryKey
            ) {
                acc = [...acc, item.recId];
            }
            return acc;
        }, []);

        const regionOfCountry = items.find(
            (item) =>
                item.regionKey === country.regionKey &&
                item.cat === "REGIONLIST",
        );
        const subRegionOfCountry = items.find(
            (item) =>
                item.subRegionKey === country.subRegionKey &&
                item.cat === "SUBREGIONLIST",
        );

        if (!ev.target.checked) {
            childItemsOfCountry.forEach((item) => {
                const indexItem = getIndex(item, newList);

                if (indexItem !== -1) {
                    newList.splice(indexItem, 1);
                }
            });
            if (regionOfCountry) {
                const indexOfRegion = getIndex(regionOfCountry, newList);
                if (indexOfRegion !== -1) {
                    newList.splice(indexOfRegion, 1);
                }
            }
            if (subRegionOfCountry) {
                const indexOfSubRegion = getIndex(subRegionOfCountry, newList);
                if (indexOfSubRegion !== -1) {
                    newList.splice(indexOfSubRegion, 1);
                }
            }
        } else {
            const excerptChildOfCountry = childItemsOfCountry.filter(
                (item) =>
                    item.regionKey === country.regionKey &&
                    item.subRegionKey === country.subRegionKey &&
                    item.countryKey === country.countryKey &&
                    !currentChildItemsOfCountry.includes(item.recId),
            );

            const rootRegionLengthOfCountry = items.filter(
                (item) => item.regionKey === country.regionKey,
            ).length;
            const currentRegionLenghOfCountry =
                formData.listStateProvince.filter(
                    (item) => item.regionKey === country.regionKey,
                ).length + excerptChildOfCountry.length;

            const rootSubRegionLength = items.filter(
                (item) =>
                    item.regionKey === country.regionKey &&
                    item.subRegionKey === country.subRegionKey,
            ).length;
            const currentSubRegionLengh =
                formData.listStateProvince.filter(
                    (item) =>
                        item.regionKey === country.regionKey &&
                        item.subRegionKey === country.subRegionKey,
                ).length + excerptChildOfCountry.length;

            if (
                rootRegionLengthOfCountry === currentRegionLenghOfCountry + 2 &&
                rootSubRegionLength === currentSubRegionLengh + 1 &&
                regionOfCountry &&
                subRegionOfCountry
            ) {
                newList = [
                    ...newList,
                    { ...regionOfCountry },
                    { ...subRegionOfCountry },
                    ...excerptChildOfCountry,
                ];
            } else if (
                rootRegionLengthOfCountry !== currentRegionLenghOfCountry + 2 &&
                rootSubRegionLength === currentSubRegionLengh + 1 &&
                subRegionOfCountry
            ) {
                newList = [
                    ...newList,
                    { ...subRegionOfCountry },
                    ...excerptChildOfCountry,
                ];
            } else {
                newList = [...newList, ...excerptChildOfCountry];
            }
        }
        setFormData((prev) => ({
            ...prev,
            listStateProvince: [...newList],
        }));
    };

    const onUpdateDestinationStatus: SwitchProps["onChange"] = (checked) => {
        setFormData((prev) => ({
            ...prev,
            status: checked ? Status.OK : Status.OX,
        }));
        if (actionType === EActionType.EDIT && initialValues) {
            onUpdateStatus(initialValues.id, checked ? Status.OK : Status.OX);
        }
    };
    const checkedState = (state: TStateProvinceGrouping) => {
        return formData.listStateProvince.some(
            (item) =>
                item.stateProvinceKey === state.stateProvinceKey &&
                item.countryKey === state.countryKey &&
                item.regionKey === state.regionKey &&
                item.subRegionKey === state.subRegionKey,
        );
    };
    const onChangeFormData = useCallback(
        (
            key: keyof Omit<IDestinationPayload, "listStateProvince">,
            value: string,
        ) => {
            setFormData((prev) => ({
                ...prev,
                [key]:
                    key === "codeKey"
                        ? vietnameseTonesToUnderscoreKeyname(
                              value,
                          ).toUpperCase()
                        : value,
            }));
        },
        [formData],
    );

    useEffect(() => {
        if (initialValues && actionType === EActionType.EDIT) {
            setFormData(() => initialValues);
        } else {
            setFormData(() => initFormData);
        }
    }, [initialValues, actionType]);

    const isButtonDisabled = useMemo(() => {
        if (
            isEqual(initialValues, formData) ||
            isEmpty(formData.listStateProvince) ||
            isEmpty(formData.codeKey)
        ) {
            return true;
        }
        return false;
    }, [initialValues, formData]);
    return (
        <Drawer
            title={
                actionType === EActionType.CREATE
                    ? "Thêm nhóm điểm đến"
                    : `Sửa nhóm điểm đến`
            }
            width={850}
            onClose={onClose}
            open={isOpen}
            styles={{
                body: {
                    paddingBottom: 80,
                },
            }}
        >
            <Form layout="vertical">
                <FormItem
                    label="Tên nhóm"
                    validateStatus={errors?.codeName ? "error" : ""}
                    required
                    help={errors?.codeName || ""}
                >
                    <Input
                        placeholder="Nhập tên nhóm"
                        value={formData.codeName}
                        onChange={(e) =>
                            onChangeFormData("codeName", e.target.value)
                        }
                    />
                </FormItem>
                <FormItem
                    label="Mã nhóm"
                    validateStatus={errors?.codeKey ? "error" : ""}
                    required
                    help={errors?.codeKey || ""}
                >
                    <Input
                        placeholder="Mã nhóm"
                        value={formData.codeKey}
                        onChange={(e) =>
                            onChangeFormData("codeKey", e.target.value)
                        }
                        disabled={actionType === EActionType.EDIT}
                        suffix={
                            <Tooltip title="Mã nhóm được ngăn cách bằng dấu gạch dưới '_' và viết bằng ký tự không dấu và số.">
                                <InfoCircleOutlined
                                    style={{ color: "rgba(0,0,0,.45)" }}
                                />
                            </Tooltip>
                        }
                    />
                </FormItem>
                <FormItem label="Trạng thái" required>
                    <div className="flex items-center">
                        <Switch
                            checked={formData.status === "OK"}
                            onChange={onUpdateDestinationStatus}
                        />
                        <span className="ml-2">Kích hoạt</span>
                    </div>
                </FormItem>
                <div className="province-wrapper">
                    {provincesGrouping.map((region) => (
                        <div className="region" key={region.recId}>
                            <div className="name py-2 font-bold">
                                <Checkbox
                                    name="region"
                                    onChange={(ev) =>
                                        onChangeRegion(ev, region)
                                    }
                                    checked={checkedState(region)}
                                >
                                    {region.regionKey}
                                </Checkbox>
                            </div>
                            <div className="region-child pl-6">
                                {region.children.map((subRegion) => (
                                    <div
                                        className="sub-region child-item"
                                        key={subRegion.recId}
                                    >
                                        <div className="name py-2 font-bold">
                                            <Checkbox
                                                name="sub-region"
                                                onChange={(ev) =>
                                                    onChangeSubRegion(
                                                        ev,
                                                        subRegion,
                                                    )
                                                }
                                                checked={checkedState(
                                                    subRegion,
                                                )}
                                            >
                                                {subRegion.subRegionKey}
                                            </Checkbox>
                                        </div>
                                        <div className="subregion-child pl-6">
                                            {subRegion.children.map(
                                                (country) => (
                                                    <div
                                                        className="child-item"
                                                        key={country.recId}
                                                    >
                                                        <div className="name">
                                                            <Checkbox
                                                                name="state"
                                                                onChange={(
                                                                    ev,
                                                                ) =>
                                                                    onChangeCountry(
                                                                        ev,
                                                                        country,
                                                                    )
                                                                }
                                                                checked={checkedState(
                                                                    country,
                                                                )}
                                                            >
                                                                {
                                                                    country.countryName
                                                                }
                                                            </Checkbox>
                                                        </div>
                                                        <div className="state pl-6">
                                                            {country.children.map(
                                                                (state) => (
                                                                    <div
                                                                        key={
                                                                            state.recId
                                                                        }
                                                                        className="py-1"
                                                                    >
                                                                        <Checkbox
                                                                            name="state"
                                                                            onChange={(
                                                                                ev,
                                                                            ) =>
                                                                                onChangeState(
                                                                                    ev,
                                                                                    state,
                                                                                )
                                                                            }
                                                                            checked={checkedState(
                                                                                state,
                                                                            )}
                                                                        >
                                                                            {
                                                                                state.stateProvinceKey
                                                                            }
                                                                        </Checkbox>
                                                                    </div>
                                                                ),
                                                            )}
                                                        </div>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </Form>
            <div className="drawler-action absolute px-4 py-4 border-t left-0 right-0 bg-white bottom-0">
                <Space>
                    <Button onClick={onClose}>Huỷ</Button>
                    <Button
                        onClick={() => onSubmit?.(actionType, formData)}
                        type="primary"
                        disabled={isButtonDisabled}
                    >
                        {actionType === EActionType.CREATE
                            ? "Thêm mới"
                            : "Cập nhật"}
                    </Button>
                </Space>
            </div>
        </Drawer>
    );
};
export default DrawlerDestination;
