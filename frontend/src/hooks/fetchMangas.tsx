import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetchMangas(endpoint: string) {
  const url = `/api/manga-list?endpoint=${endpoint}`;
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      setLoading(true);
      try {
        const res = await axios.get(url);
        if (isMounted) setData(res.data.data ?? []);
      } catch (err: any) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [endpoint]);

  return { data, loading, error };
}
