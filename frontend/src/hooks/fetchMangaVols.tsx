import { useState, useEffect } from "react";
import axios from "axios";
import { Volumes } from "../types/Manga";

const useFetchMangaVols = (endpoint: string) => {
  const [data, setData] = useState<Volumes>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
  }, [endpoint]);

  return { data, isLoading, error, refetch: fetchMangaVols };
};

export default useFetchMangaVols;
