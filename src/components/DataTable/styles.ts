import styled from "styled-components";

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

export const TableHeader = styled.th`
  background-color: #f2f2f2;
  color: #333;
  border: 1px solid #ddd;
  padding: 16px;
  text-align: left;
`;

export const TableRow = styled.td<{ width?: string }>`
  border: 1px solid #ddd;
  padding: 16px;
  text-align: left;
  background-color: #fff;
  width: ${(props) => (props.width ? props.width : "auto")};
`;

export const TableActionsRow = styled.td<{ width?: string }>`
  border: 1px solid #ddd;
  padding: 16px 8px;
  text-align: left;
  background-color: #fff;
  width: ${(props) => (props.width ? props.width : "auto")};
`;

export const EditButton = styled.button`
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  color: white;
  padding: 8px 16px;
  width: 80px;
  margin-right: 8px;

  &:hover {
    background-color: #0062cc;
    cursor: pointer;
  }
`;

export const DeleteButton = styled.button`
  background-color: #dc3545;
  border: none;
  border-radius: 4px;
  color: white;
  padding: 8px 16px;
  width: 80px;

  &:hover {
    background-color: #c82333;
    cursor: pointer;
  }
`;
