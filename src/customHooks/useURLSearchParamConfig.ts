import { SetURLSearchParams, useSearchParams } from "react-router-dom";

interface URLSearchParamsData {
  searchParamsObject: {
    [k: string]: string;
  };
  setSearchParams: SetURLSearchParams;
  hasSearchParams: boolean
}

const useURLSearchParamConfig = (): URLSearchParamsData => {
  const [searchParams, setSearchParams] = useSearchParams();
  const hasSearchParams = [...searchParams.keys()].length > 0;

  const searchParamsObject = hasSearchParams
    ? Object.fromEntries(searchParams.entries())
    : {};

  return {
    searchParamsObject,
    hasSearchParams,
    setSearchParams,
  };
};

export default useURLSearchParamConfig;
