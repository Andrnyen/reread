import { useState, useEffect } from "react";
import axios from "axios";
import { Manga } from "../types/Manga";

const useFetchManga = (endpoint: string) => {
  const [data, setData] = useState<Manga>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchManga = () => {
    setIsLoading(true);
    axios
      .get(endpoint)
      .then((response) => {
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
  }, [endpoint]);

  return { data, isLoading, error, refetch: fetchManga };
};

export default useFetchManga;
