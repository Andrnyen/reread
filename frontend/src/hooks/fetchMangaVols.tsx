import { useEffect, useState } from "react";
import axios from "axios";

const useFetchMangaVols = (mangaId: string) => {
  const endpoint = `/api/volumes?mangaId=${mangaId}`;

  const [data, setData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMangaVols = () => {
    setIsLoading(true);
    axios
      .get(endpoint)
      .then((response) => {
        setData(response.data.volumes);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchMangaVols();
  }, [mangaId]);

  return { data, isLoading, error, refetch: fetchMangaVols };
};

export default useFetchMangaVols;
