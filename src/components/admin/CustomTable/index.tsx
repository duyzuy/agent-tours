import styled from "styled-components";
import { Table, TableProps } from "antd";
import React from "react";

type CustomTablePops<T> = TableProps<T> & {};

function CustomTable<T extends {}>(props: CustomTablePops<T>) {
    return <StyledTable {...props} />;
}
export default CustomTable;

const StyledTable = styled(Table)`
    & table {
        border-spacing: 0 10px !important;
    }
    & .ant-table-row {
        .ant-table-cell {
            border-top: 1px solid var(--neutrals-07);

            &:first-child {
                border-left: 1px solid var(--neutrals-07);
                border-top-left-radius: 8px;
                border-bottom-left-radius: 8px;
            }
            &:last-child {
                border-right: 1px solid var(--neutrals-07);
                border-top-right-radius: 8px;
                border-bottom-right-radius: 8px;
            }
        }
        
        
    }
    & .ant-table-thead {
        .ant-table-cell {
            border-bottom-width: 0; border;
            &:first-child {
                
                border-top-left-radius: 8px;
                border-bottom-left-radius: 8px;
            }
            &:last-child {
                
                border-top-right-radius: 8px;
                border-bottom-right-radius: 8px;
            }
        }
    }
`;
