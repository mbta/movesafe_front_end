import { colors, fonts } from "@repo/themes";
import styled from "styled-components";

export const LabelsContainer = styled.div`
    width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

export const Label = styled.div`
	font-size: ${fonts.medium};
    font-weight: 500;
    color: ${colors.gray};
`;

export const DataItemsContainer = styled.div`
    width: 100%;
	display: flex;
    flex-direction: column;
`;

export const DataItem = styled.div`
    width: 100%;
	display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const LogsTable = styled.table`
    width: 100%;
    text-align: left;
    padding: 1em;
`;

export const TableCell = styled.td`
    border-top: 1px solid ${colors.softGray};
    padding: 1em;
    padding-left: 0
`;