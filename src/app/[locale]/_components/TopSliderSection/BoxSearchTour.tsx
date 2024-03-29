import styled from "styled-components";
import { Button, Input } from "antd";
import IconUser from "@/assets/icons/IconUser";
import IconMapPin from "@/assets/icons/IconMapPin";
import IconCalendar from "@/assets/icons/IconCalendar";
import IconSearch from "@/assets/icons/IconSearch";

const BoxSearchTour = () => {
    return (
        <div className="search-box-tour px-6">
            <div className="bg-white px-6 py-6 rounded-md shadow-md max-w-2xl mx-auto">
                <div className="flex flex-wrap items-center gap-x-4">
                    <div className="control mb-4 lg:mb-0 w-full flex-1">
                        <Input
                            size="large"
                            placeholder="Bạn muốn đi đâu"
                            prefix={<IconMapPin />}
                        />
                    </div>
                    <div className="control mb-4 lg:mb-0 w-full lg:w-1/3">
                        <Input
                            size="large"
                            placeholder="Ngày đi, ngày về"
                            prefix={<IconCalendar />}
                        />
                    </div>
                    <div className="button">
                        <ButtonSearch
                            danger
                            type="primary"
                            size="large"
                            className="flex items-center"
                            style={{ display: "flex" }}
                        >
                            <span className="mr-2">
                                <IconSearch />
                            </span>
                            <span>Tìm kiếm</span>
                        </ButtonSearch>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default BoxSearchTour;

const ButtonSearch = styled(Button)`
    && {
        display: flex;
    }
`;
