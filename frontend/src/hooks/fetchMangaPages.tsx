import { useState, useEffect } from "react";
import axios from "axios";
import { MangaPages } from "../types/Manga";

const useFetchMangaPages = (endpoint: string) => {
  const [data, setData] = useState<MangaPages>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMangaPages = () => {
    setIsLoading(true);
    axios
      .get(endpoint)
      .then((response) => {
        setData(response.data.chapter);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchMangaPages();
  }, [endpoint]);

  return { data, isLoading, error, refetch: fetchMangaPages };
};

export default useFetchMangaPages;
