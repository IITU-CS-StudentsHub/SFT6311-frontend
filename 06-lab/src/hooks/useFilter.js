import { useMemo } from 'react';

export const useFilter = (data, filterParams) => {
  const filteredData = useMemo(() => {
    if (!data) return [];
    
    return data.filter((item) => {
      let match = true;

      // Filter by search text
      if (filterParams.search) {
        match = match && item.title.toLowerCase().includes(filterParams.search.toLowerCase());
      }

      // Filter by category
      if (
        filterParams.category &&
        filterParams.category.toLowerCase() !== 'all'
      ) {
        match = match && item.category === filterParams.category;
      }

      // Filter by status
      if (
        filterParams.status &&
        filterParams.status.toLowerCase() !== 'all'
      ) {
        match = match && item.status === filterParams.status;
      }

      return match;
    });
  }, [data, filterParams]);

  return filteredData;
};
