import { useGetRegionList } from "@/queries/core/region";
import ProvinceStateSelection from "../DrawlerDestination/ProvinceStateSelection";
import { TreeSelect, TreeSelectProps } from "antd";
import { IStateProvince } from "@/models/management/region.interface";
import { useMemo } from "react";

type TStateProvinceGrouping = IStateProvince & {
  label: string;
  value: string;
  children: TStateProvinceGrouping[];
};

export interface StateProvinceSelectorProps {
  onSelect?: TreeSelectProps<string, TStateProvinceGrouping>["onSelect"];
  value?: string;
}
const StateProvinceSelector: React.FC<StateProvinceSelectorProps> = ({ value, onSelect }) => {
  const { data: regionList, isLoading } = useGetRegionList();

  const provincesGrouping = useMemo(() => {
    if (!regionList) return;

    const itemMap = regionList.reduce<{
      [key: string]: IStateProvince[];
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
      let restOfChildRegion: IStateProvince[] = [];
      itemMap["SUBREGIONLIST"].forEach((subRegion) => {
        if (subRegion.regionKey === region.regionKey) {
          let countries: TStateProvinceGrouping[] = [];
          let restCountries: IStateProvince[] = [];
          itemMap["COUNTRYLIST"].forEach((country) => {
            if (country.regionKey === region.regionKey && country.subRegionKey === subRegion.subRegionKey) {
              let states: TStateProvinceGrouping[] = [];
              let restStates: IStateProvince[] = [];

              itemMap["STATEPROVINCELIST"].forEach((state) => {
                if (
                  state.regionKey === region.regionKey &&
                  state.subRegionKey === subRegion.subRegionKey &&
                  state.countryKey === country.countryKey
                ) {
                  states = [
                    ...states,
                    {
                      ...state,
                      label: state.stateProvinceKey,
                      value: state.stateProvinceKey,
                      children: [],
                    },
                  ];
                } else {
                  restStates = [...restStates, state];
                }
              });

              countries = [
                ...countries,
                {
                  ...country,
                  label: country.countryName,
                  value: country.countryKey,
                  children: states,
                },
              ];
              itemMap["STATEPROVINCELIST"] = restStates;
            } else {
              restCountries = [...restCountries, country];
            }
          });

          childsOfRegion = [
            ...childsOfRegion,
            {
              ...subRegion,
              label: subRegion.subRegionKey,
              value: subRegion.subRegionKey,
              children: countries,
            },
          ];
        } else {
          restOfChildRegion = [...restOfChildRegion, subRegion];
        }
      });
      itemMap["SUBREGIONLIST"] = restOfChildRegion;
      const regionItem: TStateProvinceGrouping = {
        ...region,
        label: region.regionKey,
        value: region.regionKey,
        children: childsOfRegion,
      };

      output = [...output, regionItem];
    });
    return output;
  }, [regionList]);

  // console.log(provincesGrouping);
  // const handleSelect: TreeSelectProps<string, TStateProvinceGrouping>["onSelect"] = (value, labelList) => {
  //   console.log(value, labelList);
  // };
  return (
    <TreeSelect<string, TStateProvinceGrouping>
      showSearch
      style={{ width: "100%" }}
      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
      placeholder="Chọn điểm đến"
      value={value}
      allowClear
      treeDefaultExpandAll
      loading={isLoading}
      onSelect={onSelect}
      treeData={provincesGrouping}
    />
  );
};
export default StateProvinceSelector;
