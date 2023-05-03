# Projeto React com TypeScript

Este é um projeto desenvolvido com as tecnologias React e TypeScript, utilizando as seguintes bibliotecas:

- styled-components: para criação de estilos;
- axios: para realização de requisições;
- react-hook-form: para manipulação de formulários;
- react-input-mask: para aplicação de máscaras em campos de formulários;
- usehooks-ts: para manipulação de localStorage
- react-toastify: para exibição de notificações;
- react-icons: para utilização de ícones.

### `Funcionalidades`

O objetivo deste projeto é realizar o CRUD (Create, Read, Update e Delete) de empresas e fornecedores. As seguintes funcionalidades foram implementadas:

- Criação, edição, exclusão e listagem de empresas;
- Criação, edição, exclusão e listagem de fornecedores;
- Associação de fornecedores a empresas;
- Validação de campos como CPF, CNPJ, CEP e email;
- Validar, caso a empresa seja do Paraná, que não seja possível cadastrar fornecedores menores de idade;
- Filtro de empresas e fornecedores por qualquer campo;
- Validação de CEP utilizando a API http://cep.la/api;
- Todas as informações de Fornecedores e Empresas são armazenadas no localStorage
- Testes unitários nos componentes.

### `Como executar o projeto`

Para executar o projeto, siga os seguintes passos:

1. Clone o repositório em sua máquina;
2. Abra o terminal na pasta raiz do projeto e execute o comando `npm install` ou `yarn` para instalar as dependências;
3. Execute o comando `npm start` ou `yarn start` para iniciar o servidor local.
4. Acesse a aplicação em http://localhost:3000/