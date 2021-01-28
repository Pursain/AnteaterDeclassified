import { useState, useEffect } from 'react';

// creds: https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    },
    [value] 
  );

  return debouncedValue;
}