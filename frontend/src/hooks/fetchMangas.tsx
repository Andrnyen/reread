import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetchMangas(endpoint: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      setLoading(true);
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/manga-list?endpoint=${encodeURIComponent(endpoint)}`
        );
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
