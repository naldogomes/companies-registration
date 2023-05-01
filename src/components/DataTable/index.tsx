import { Table, TableHeader, TableRow } from "./styles";
import { BsTrash, BsPencil } from "react-icons/bs";

type DataTableProps = {
  headers: string[];
  data: any;
};

const handleDelete = (index: any) => {
  console.log(index);
};

const handleEdit = (index: any) => {
  console.log(index);
};

const DataTable = ({ headers, data }: DataTableProps) => {
  return (
    <Table>
      <thead>
        <tr>
          {headers.map((header) => (
            <TableHeader key={header}>{header}</TableHeader>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row: any, index: number) => (
          <tr key={index}>
            {Object.values(row).map((value: any, index: number) => (
              <TableRow key={index}>{value}</TableRow>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DataTable;
