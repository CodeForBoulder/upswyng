export const getSearchParamVal = (paramName: string) => {
  const allSearchParams = new URLSearchParams(location.search);

  return allSearchParams.get(paramName) || null;
};
