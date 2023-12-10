import styled from "styled-components";
import { Button, Input } from "antd";
import IconUser from "@/assets/icons/IconUser";
import IconMapPin from "@/assets/icons/IconMapPin";
import IconCalendar from "@/assets/icons/IconCalendar";
import IconSearch from "@/assets/icons/IconSearch";

const BoxSearchTour = () => {
    return (
        <div className="search-box-tour bg-white px-6 py-6 rounded-md shadow-md">
            <div className="control mb-4">
                <Input
                    size="large"
                    placeholder="Bạn muốn đi đâu"
                    prefix={<IconMapPin />}
                />
            </div>
            <div className="flex items-center gap-x-4">
                <div className="control w-1/2">
                    <Input
                        size="large"
                        placeholder="1 người lớn"
                        prefix={<IconUser />}
                    />
                </div>
                <div className="control w-1/2">
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
    );
};
export default BoxSearchTour;

const ButtonSearch = styled(Button)`
    && {
        display: flex;
    }
`;
