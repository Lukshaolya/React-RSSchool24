import { useState, useEffect } from 'react';

const useSearchQuery = (key: string) => {
  const [inputValue, setinputValue] = useState<string>(() => {
    return localStorage.getItem(key) || '';
  });

  const saveToLocalStorage = () => {
    localStorage.setItem(key, inputValue);
  };

  useEffect(() => {
    return () => {
      localStorage.setItem(key, inputValue);
    };
  }, []);

  return [inputValue, setinputValue, saveToLocalStorage] as const;
};

export default useSearchQuery;
