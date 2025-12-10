import { useEffect, useState } from "react";
import axios from "axios";
import { MangaPages } from "../types/Manga";

const useFetchMangaPages = (chapterId: string) => {
  const endpoint = `/api/pages?chapterId=${chapterId}`;

  const [data, setData] = useState<MangaPages | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPages = () => {
    setIsLoading(true);

    axios
      .get(endpoint)
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching pages:", err);
        setError(err.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchPages();
  }, [chapterId]);

  return { data, isLoading, error, refetch: fetchPages };
};

export default useFetchMangaPages;
