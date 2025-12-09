import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetchMangas(endpoint: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);

        const res = await axios.get(
          `/api/manga-list?endpoint=${encodeURIComponent(endpoint)}`
        );

        if (!isMounted) return;

        // backend should return { data: [...] }
        setData(res.data?.data ?? []);
      } catch (err: any) {
        if (!isMounted) return;
        setError(err.message || "Failed to load MangaDex data");
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
