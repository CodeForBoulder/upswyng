export const getSearchParamVal = (paramName: string): string | null => {
  const allSearchParams = new URLSearchParams(window.location.search);

  return allSearchParams.get(paramName);
};
