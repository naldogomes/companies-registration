import { InputHTMLAttributes } from "react";
import { SearchContainer, SearchIcon, SearchInput } from "./styles";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Search = ({ label, ...rest }: SearchInputProps) => {
  return (
    <SearchContainer>
      <SearchIcon />
      <SearchInput type="search" {...rest} data-testid="search-input" />
    </SearchContainer>
  );
};

export default Search;
