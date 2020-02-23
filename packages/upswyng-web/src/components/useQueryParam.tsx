import { useLocation } from "react-router-dom";

const useSearchParam = (name: string): string | null => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  return searchParams.get(name);
};

export default useSearchParam;
