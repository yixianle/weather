import {
  useCallback, useEffect, useMemo, useState,
} from 'react';

const useFetch = <T, P>(
  api: (...args: P[]) => Promise<T>,
  initialValue: T,
  args: Parameters<typeof api>,
): [T, boolean, () => void, (x: T) => void] => {
  const [data, setData] = useState({ data: initialValue, loading: false });
  const [x, setX] = useState(Symbol('x'));

  const deps = useMemo(() => [...args, x], [args]);

  useEffect(() => {
    let aborted = false;

    const fetch = async () => {
      try {
        setData({ ...data, loading: true });
        const res = await api(...args);
        if (!aborted) {
          setData({ data: res, loading: false });
        }
      } catch (e) {
        if (!aborted) {
          setData({ ...data, loading: false });
        }
      }
    };

    fetch();

    return () => { aborted = true; };
  }, deps);

  const refresh = useCallback(() => setX(Symbol('x')), []);

  return [data.data, data.loading, refresh, (y: T) => {
    setData({ loading: false, data: y });
  }];
};

export default useFetch;
