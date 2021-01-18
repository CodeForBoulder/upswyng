import { Dispatch, SetStateAction, useEffect, useState } from "react";

function useLocalStorage<T>(
  key: string
): [T | null, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const storedValue = window.localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : null;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
