import { useEffect, useState } from "react";
import axios from "axios";

const useFetchManga = (mangaId: string) => {
  const endpoint = `/api/manga?mangaId=${mangaId}`;

  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchManga = () => {
    setIsLoading(true);
    axios
      .get(endpoint)
      .then((response) => {
        console.log(response.data);
        setData(response.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchManga();
  }, [mangaId]);

  return { data, isLoading, error, refetch: fetchManga };
};

export default useFetchManga;
