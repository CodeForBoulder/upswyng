export const getSearchParamVal = (paramName: string): string | null => {
  const allSearchParams = new URLSearchParams(location.search);

  return allSearchParams.get(paramName);
};
