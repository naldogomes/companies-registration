import { CompanyTableData } from "../../pages/ListCompanies";
import { SupplierTableData } from "../../pages/ListSuppliers";
import {
  DeleteButton,
  EditButton,
  Table,
  TableActionsRow,
  TableHeader,
  TableRow,
} from "./styles";

export type DataTableProps = {
  headers: string[];
  data: CompanyTableData[] | SupplierTableData[];
  handleEdit?: (index: any) => void;
  handleDelete?: (index: any) => void;
};

const DataTable = ({
  headers,
  data,
  handleEdit,
  handleDelete,
}: DataTableProps) => {
  const hasEditAndDelete = handleEdit && handleDelete;

  return (
    <Table>
      <thead>
        <tr>
          {headers.map((header) => (
            <TableHeader key={header}>{header}</TableHeader>
          ))}
          {hasEditAndDelete && <TableHeader>Ações</TableHeader>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {Object.values(row).map((value, index) => (
              <TableRow key={index}>{value}</TableRow>
            ))}
            {hasEditAndDelete && (
              <TableActionsRow key={index} width="185px">
                <EditButton
                  onClick={() => {
                    handleEdit(index);
                  }}
                >
                  Editar
                </EditButton>
                <DeleteButton
                  onClick={() => {
                    handleDelete(index);
                  }}
                >
                  Deletar
                </DeleteButton>
              </TableActionsRow>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DataTable;
