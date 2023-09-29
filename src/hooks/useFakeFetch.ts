import { useEffect, useState } from 'react';
import { DATA } from '../mock';
import { User } from '../models';

export const useFakeFetch = () => {
  const [data, setData] = useState<User[] | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setIsFetching(true);
    const timer = setTimeout(() => {
      setIsFetching(false);
      setError('');
      setData(DATA);
      //   Uncomment if you want to show error message
      //   setError('Something went wrong!');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return { data, isFetching, error };
};

export default useFakeFetch;
