import { useState, useEffect } from "react";
import axios from "axios";
import { Manga } from "../types/Manga";

const useFetchMangas = (endpoint: string) => {
  const [data, setData] = useState<Manga[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMangas = () => {
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
    fetchMangas();
  }, [endpoint]);

  return { data, isLoading, error, refetch: fetchMangas };
};

export default useFetchMangas;
