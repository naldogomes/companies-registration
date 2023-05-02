import { FaSearch } from "react-icons/fa";
import styled from "styled-components";

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8px 16px;
  width: 100%;
  margin-bottom: 16px;
`;

export const SearchInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  padding: 0.5rem;
`;

export const SearchIcon = styled(FaSearch)`
  margin-right: 8px;
`;