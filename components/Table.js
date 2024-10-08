import React, { useState } from 'react';
import styled from 'styled-components';
import { StyledButton } from './EntryForm';

const TableContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 100%;
  overflow-x: auto;
  max-height : 50vh;
  overflow-y : scroll;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  &:thead>tr{
    width: 100%;
    position: fixed;
  }
`;

const TableHeader = styled.th`
  padding: 12px;
  background-color: #f5f5f5;
  text-align: left;
  font-weight: bold;
  border-bottom: 1px solid #ddd;

`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const Tbody = styled.tbody`
 width : 100%;
 max-height : 30vh;
 overflow-y : scroll;
`;

export const CustomTable = ({ columns, data, onSelectRow, customRender }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    // Handle select all checkbox
    const handleSelectAll = (e) => {
        const checked = e.target.checked;
        setSelectAll(checked);
        setSelectedRows(checked ? data.map((row) => row.id) : []);
    };

    // Handle individual row selection
    const handleRowSelection = (id, e) => {
        const checked = e.target.checked;
        const updatedSelectedRows = checked
            ? [...selectedRows, id]
            : selectedRows.filter((rowId) => rowId !== id);

        setSelectedRows(updatedSelectedRows);
        if (onSelectRow) {
            onSelectRow(updatedSelectedRows);
        }
    };

    return (
        <TableContainer>
            <Table>
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <>
                                <TableHeader key={index}>
                                    {col.key === 'checkbox' ? (
                                        <Checkbox
                                            type="checkbox"
                                            checked={selectAll}
                                            onChange={handleSelectAll}
                                        />
                                    ) : (
                                        col.label
                                    )}
                                </TableHeader>
                            </>
                        ))}
                        <TableHeader data-label="Action">Action</TableHeader>
                    </tr>
                </thead>
                <Tbody>
                    {data.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {columns.map((col, colIndex) => (
                                <TableCell key={colIndex}>
                                    {col.key === 'checkbox' ? (
                                        <Checkbox
                                            type="checkbox"
                                            checked={selectedRows.includes(row.id)}
                                            onChange={(e) => handleRowSelection(row.id, e)}
                                        />
                                    ) : customRender ? (
                                        customRender(row, col)
                                    ) : (
                                        row[col.key] || '-'
                                    )}
                                </TableCell>
                            ))}
                            {/* Render the Edit button in each row */}
                            <TableCell>
                                <StyledButton onClick={() => onSelectRow(row)}>
                                    Edit
                                </StyledButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};
