import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import { useLocation, useNavigate } from "react-router-dom";

type UseSearchProps = {
  searchInput: string;
  searchValue: string;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const useSearch = (): UseSearchProps => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchParam = queryParams.get("q");

  const [searchInput, setSearchInput] = useState(searchParam || "");
  const searchValue = useDebounce(searchInput, 200);
  const navigate = useNavigate();

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    searchValue.length > 0
      ? queryParams.set("q", `${searchValue}`)
      : queryParams.delete("q");

    navigate(`${location.pathname}?${queryParams}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return {
    searchInput,
    searchValue,
    handleSearch
  };
};
