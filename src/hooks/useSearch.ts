import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import { useNavigate } from "react-router-dom";

type UseSearchProps = {
  searchInput: string;
  searchValue: string;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const useSearch = (pathname: string, search: string): UseSearchProps => {
  const [searchInput, setSearchInput] = useState("");
  const searchValue = useDebounce(searchInput, 200);
  const navigate = useNavigate();

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    if (searchValue.length > 0) navigate(`${pathname}?q=${searchValue}`);
  }, [navigate, pathname, searchValue]);

  useEffect(() => {
    setSearchInput(search.slice(3));
  }, [search]);

  return {
    searchInput,
    searchValue,
    handleSearch,
  };
};
