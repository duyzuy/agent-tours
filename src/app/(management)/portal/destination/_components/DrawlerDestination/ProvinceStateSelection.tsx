import { useEffect, useMemo, useState, memo } from "react";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { IStateProvince, IStateProvinceListRs } from "@/models/management/region.interface";
import { isUndefined } from "lodash";

type TStateProvinceGrouping = IStateProvince & {
  children?: TStateProvinceGrouping[];
};

interface ProvinceStateSelectionProps {
  items?: IStateProvince[];
  value?: IStateProvince[];
  onChange?: (value: IStateProvince[]) => void;
  editAble?: boolean;
}

const ProvinceStateSelection: React.FC<ProvinceStateSelectionProps> = ({
  items = [],
  value,
  onChange,
  editAble = true,
}) => {
  const [provinceList, setProvinceList] = useState<IStateProvince[]>();

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
            if (country.regionKey === region.regionKey && country.subRegionKey === subRegion.subRegionKey) {
              let states: TStateProvinceGrouping[] = [];
              let restStates: IStateProvinceListRs["result"] = [];

              itemMap["STATEPROVINCELIST"].forEach((state) => {
                if (
                  state.regionKey === region.regionKey &&
                  state.subRegionKey === subRegion.subRegionKey &&
                  state.countryKey === country.countryKey
                ) {
                  states = [...states, { ...state, children: [] }];
                } else {
                  restStates = [...restStates, state];
                }
              });

              countries = [...countries, { ...country, children: states }];
              itemMap["STATEPROVINCELIST"] = restStates;
            } else {
              restCountries = [...restCountries, country];
            }
          });

          childsOfRegion = [...childsOfRegion, { ...subRegion, children: countries }];
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

  const getIndex = (value: IStateProvince, values: IStateProvince[]) => {
    return values.findIndex(
      (item) =>
        item.regionKey === value.regionKey &&
        item.subRegionKey === value.subRegionKey &&
        item.countryKey === value.countryKey &&
        item.stateProvinceKey === value.stateProvinceKey,
    );
  };

  const changeRegion = (ev: CheckboxChangeEvent, region: TStateProvinceGrouping) => {
    let newList = [...(provinceList || [])];

    const allChildIdOfRegion = provinceList?.reduce<number[]>((acc, item) => {
      if (item.regionKey === region.regionKey) {
        acc = [...acc, item.recId];
      }
      return acc;
    }, []);
    const childItemsOfRegion = items.filter((item) => item.regionKey === region.regionKey);
    if (!ev.target.checked) {
      childItemsOfRegion.forEach((item) => {
        const indexItem = getIndex(item, newList);

        if (indexItem !== -1) {
          newList.splice(indexItem, 1);
        }
      });
    } else {
      const excerptRestChildsOfRegion = childItemsOfRegion.filter(
        (item) => item.regionKey === region.regionKey && !allChildIdOfRegion?.includes(item.recId),
      );

      newList = [...newList, ...excerptRestChildsOfRegion];
    }
    if (isUndefined(value)) {
      setProvinceList(newList);
    }
    onChange?.(newList);
  };

  const changeSubRegion = (ev: CheckboxChangeEvent, subRegion: TStateProvinceGrouping) => {
    let newList = [...(provinceList || [])];
    const childItemsOfSubRegion = items.filter(
      (item) => item.regionKey === subRegion.regionKey && item.subRegionKey === subRegion.subRegionKey,
    );

    const currentChildItemsOfSubRegion = provinceList?.reduce<number[]>((acc, item) => {
      if (item.regionKey === subRegion.regionKey && item.subRegionKey === subRegion.subRegionKey) {
        acc = [...acc, item.recId];
      }
      return acc;
    }, []);

    const regionOfSubRegion = items.find((item) => item.regionKey === subRegion.regionKey && item.cat === "REGIONLIST");

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
      const rootSubRegionLengthOfRegion = items.filter((item) => item.regionKey === subRegion.regionKey).length;

      const excerptChildOfRegion = childItemsOfSubRegion.filter(
        (item) => !currentChildItemsOfSubRegion?.includes(item.recId),
      );

      const currentSubRegionLenghOfRegion =
        provinceList?.filter((item) => item.regionKey === subRegion.regionKey).length ?? 0;

      if (
        rootSubRegionLengthOfRegion === currentSubRegionLenghOfRegion + excerptChildOfRegion.length + 1 &&
        regionOfSubRegion
      ) {
        newList = [...newList, { ...regionOfSubRegion }, ...excerptChildOfRegion];
      } else {
        newList = [...newList, ...excerptChildOfRegion];
      }
    }
    isUndefined(value) && setProvinceList(newList);
    onChange?.(newList);
  };

  const changeCountry = (ev: CheckboxChangeEvent, country: TStateProvinceGrouping) => {
    let newList = [...(provinceList || [])];
    const childItemsOfCountry = items.filter(
      (item) =>
        item.regionKey === country.regionKey &&
        item.subRegionKey === country.subRegionKey &&
        item.countryKey === country.countryKey,
    );

    const currentChildItemsOfCountry = provinceList?.reduce<number[]>((acc, item) => {
      if (
        item.regionKey === country.regionKey &&
        item.subRegionKey === country.subRegionKey &&
        item.countryKey === country.countryKey
      ) {
        acc = [...acc, item.recId];
      }
      return acc;
    }, []);

    const regionOfCountry = items.find((item) => item.regionKey === country.regionKey && item.cat === "REGIONLIST");
    const subRegionOfCountry = items.find(
      (item) => item.subRegionKey === country.subRegionKey && item.cat === "SUBREGIONLIST",
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
          !currentChildItemsOfCountry?.includes(item.recId),
      );

      const rootRegionLengthOfCountry = items.filter((item) => item.regionKey === country.regionKey).length;
      const currentRegionLenghOfCountry = provinceList
        ? provinceList.filter((item) => item.regionKey === country.regionKey).length + excerptChildOfCountry.length
        : excerptChildOfCountry.length;

      const rootSubRegionLength = items.filter(
        (item) => item.regionKey === country.regionKey && item.subRegionKey === country.subRegionKey,
      ).length;
      const currentSubRegionLengh = provinceList
        ? provinceList.filter(
            (item) => item.regionKey === country.regionKey && item.subRegionKey === country.subRegionKey,
          ).length + excerptChildOfCountry.length
        : excerptChildOfCountry.length;

      if (
        rootRegionLengthOfCountry === currentRegionLenghOfCountry + 2 &&
        rootSubRegionLength === currentSubRegionLengh + 1 &&
        regionOfCountry &&
        subRegionOfCountry
      ) {
        newList = [...newList, { ...regionOfCountry }, { ...subRegionOfCountry }, ...excerptChildOfCountry];
      } else if (
        rootRegionLengthOfCountry !== currentRegionLenghOfCountry + 2 &&
        rootSubRegionLength === currentSubRegionLengh + 1 &&
        subRegionOfCountry
      ) {
        newList = [...newList, { ...subRegionOfCountry }, ...excerptChildOfCountry];
      } else {
        newList = [...newList, ...excerptChildOfCountry];
      }
    }
    isUndefined(value) && setProvinceList(newList);

    onChange?.(newList);
  };

  const changeProvinceState = (ev: CheckboxChangeEvent, state: TStateProvinceGrouping) => {
    let newList = [...(provinceList || [])];
    const regionOfState = items.find((item) => item.regionKey === state.regionKey && item.cat === "REGIONLIST");
    const subRegionOfState = items.find(
      (item) => item.subRegionKey === state.subRegionKey && item.cat === "SUBREGIONLIST",
    );

    const countryOfState = items.find((item) => item.countryKey === state.countryKey && item.cat === "COUNTRYLIST");

    if (!ev.target.checked) {
      const indexItem = getIndex(state, provinceList ?? []);

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

      const rootRegionLengthOfState = items.filter((item) => item.regionKey === state.regionKey).length;
      const currentRegionLenghOfState = provinceList?.filter((item) => item.regionKey === state.regionKey).length ?? 0;

      const rootSubRegionLength = items.filter(
        (item) => item.regionKey === state.regionKey && item.subRegionKey === state.subRegionKey,
      ).length;
      const currentSubRegionLengh =
        provinceList?.filter((item) => item.regionKey === state.regionKey && item.subRegionKey === state.subRegionKey)
          .length ?? 0;

      const rootCountryLengthOfState = items.filter(
        (item) =>
          item.regionKey === state.regionKey &&
          item.subRegionKey === state.subRegionKey &&
          item.countryKey === state.countryKey,
      ).length;
      const currentCountryLenghOfState =
        provinceList?.filter(
          (item) =>
            item.regionKey === state.regionKey &&
            item.subRegionKey === state.subRegionKey &&
            item.countryKey === state.countryKey,
        ).length ?? 0;

      if (
        rootRegionLengthOfState === currentRegionLenghOfState + 4 &&
        regionOfState &&
        subRegionOfState &&
        countryOfState
      ) {
        newList = [...newList, { ...regionOfState }, { ...subRegionOfState }, { ...countryOfState }, restOfStates];
      } else if (
        rootSubRegionLength === currentSubRegionLengh + 3 &&
        rootRegionLengthOfState !== currentRegionLenghOfState + 4 &&
        subRegionOfState &&
        countryOfState
      ) {
        newList = [...newList, { ...subRegionOfState }, { ...countryOfState }, restOfStates];
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

    isUndefined(value) && setProvinceList(newList);
    onChange?.(newList);
  };

  const hasCheckedState = (
    state: TStateProvinceGrouping,
    cat: "REGIONLIST" | "SUBREGIONLIST" | "COUNTRYLIST" | "STATEPROVINCELIST",
  ) => {
    return Boolean(
      provinceList?.some(
        (item) =>
          item.regionKey === state.regionKey &&
          item.subRegionKey === state.subRegionKey &&
          item.countryKey === state.countryKey &&
          item.stateProvinceKey === state.stateProvinceKey,
      ),
    );
  };
  useEffect(() => {
    setProvinceList(value);
  }),
    [value];

  return (
    <>
      {provincesGrouping.map((region) => (
        <div className="region" key={region.recId}>
          <div className="name py-2 font-bold">
            <Checkbox
              name="region"
              onChange={(ev) => changeRegion(ev, region)}
              checked={hasCheckedState(region, "REGIONLIST")}
              disabled={!editAble}
            >
              {region.regionKey}
            </Checkbox>
          </div>
          <div className="region-child pl-6">
            {region?.children?.map((subRegion) => (
              <div className="sub-region child-item" key={subRegion.recId}>
                <div className="name py-2 font-bold">
                  <Checkbox
                    name="sub-region"
                    onChange={(ev) => changeSubRegion(ev, subRegion)}
                    checked={hasCheckedState(subRegion, "SUBREGIONLIST")}
                    disabled={!editAble}
                  >
                    {subRegion.subRegionKey}
                  </Checkbox>
                </div>
                <div className="subregion-child pl-6">
                  {subRegion?.children?.map((country) => (
                    <div className="child-item" key={country.recId}>
                      <div className="name">
                        <Checkbox
                          name="state"
                          onChange={(ev) => changeCountry(ev, country)}
                          checked={hasCheckedState(country, "COUNTRYLIST")}
                          disabled={!editAble}
                        >
                          {country.countryName}
                        </Checkbox>
                      </div>
                      <div className="state pl-6">
                        {country?.children?.map((state) => (
                          <div key={state.recId} className="py-1">
                            <Checkbox
                              name="state"
                              onChange={(ev) => changeProvinceState(ev, state)}
                              checked={hasCheckedState(state, "STATEPROVINCELIST")}
                              disabled={!editAble}
                            >
                              {state.stateProvinceKey}
                            </Checkbox>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};
export default memo(ProvinceStateSelection);
