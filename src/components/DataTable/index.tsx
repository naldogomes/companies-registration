import {
  DeleteButton,
  EditButton,
  Table,
  TableActionsRow,
  TableHeader,
  TableRow,
} from "./styles";

type DataTableProps = {
  headers: string[];
  data: any;
};

const handleEdit = (index: any) => {
  console.log(index);
};

const handleDelete = (index: any) => {
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
          <TableHeader>Ações</TableHeader>
        </tr>
      </thead>
      <tbody>
        {data.map((row: any, index: number) => (
          <tr key={index}>
            {Object.values(row).map((value: any, index: number) => (
              <TableRow key={index}>{value}</TableRow>
            ))}
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
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DataTable;
