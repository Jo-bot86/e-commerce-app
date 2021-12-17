import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { dataApi } from '../shared/DataApi';

export function useDataApi<T>(
  id?: string
): [T | undefined, Dispatch<SetStateAction<T | undefined>>] {
  const [data, setData] = useState<T>();

  useEffect(() => {
    dataApi<T>('GET', `products/${id ? id : ''}`, setData);
  }, [id]);

  return [data, setData];
}