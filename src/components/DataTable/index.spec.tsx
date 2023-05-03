import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DataTable, { DataTableProps } from ".";

const mockData: DataTableProps = {
  headers: ["CNPJ", "Nome fantasia", "CEP", "UF", "Cidade"],
  data: [
    {
      CNPJ: "46.860.368/0001-20",
      fantasyName: "Letícia e Carlos Eduardo Entulhos ME",
      cep: "14806-121",
      uf: "RN",
      city: "Natal",
    },
    {
      CNPJ: "44.868.086/0001-44",
      fantasyName: "Emily e Fábio Borracharia",
      cep: "15502-227",
      uf: "SP",
      city: "Votuporanga",
    },
  ],
  handleEdit: jest.fn(),
  handleDelete: jest.fn(),
};

const hasActions = !!mockData.handleDelete && !!mockData.handleEdit;

const itif = (hasActions: boolean) => (hasActions ? it : it.skip);

describe("DataTable", () => {
  it("should render table headers and data", () => {
    render(<DataTable {...mockData} />);
    const headers = screen.getAllByRole("columnheader");
    const cells = screen.getAllByRole("cell");

    expect(headers).toHaveLength(
      mockData.headers.length + (hasActions ? 1 : 0)
    );
    expect(cells).toHaveLength(
      (mockData.headers.length + (hasActions ? 1 : 0)) * mockData.data.length
    );
  });

  itif(hasActions)(
    "should render table actions row when handleEdit and handleDelete are provided",
    () => {
      render(<DataTable {...mockData} />);
      const actionsCells = screen.getAllByRole("cell", {
        name: /editar|deletar/i,
      });

      expect(actionsCells).toHaveLength(mockData.data.length);
    }
  );

  itif(hasActions)(
    "should call handleEdit and handleDelete with the correct index when the buttons are clicked",
    () => {
      render(<DataTable {...mockData} />);
      const editButtons = screen.getAllByRole("button", { name: /editar/i });
      const deleteButtons = screen.getAllByRole("button", { name: /deletar/i });

      editButtons.forEach((button, index) => {
        userEvent.click(button);
        expect(mockData.handleEdit).toHaveBeenCalledWith(index);
      });

      deleteButtons.forEach((button, index) => {
        userEvent.click(button);
        expect(mockData.handleDelete).toHaveBeenCalledWith(index);
      });
    }
  );
});
