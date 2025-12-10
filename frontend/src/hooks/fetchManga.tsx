import { useEffect, useState } from "react";
import axios from "axios";
import { mdxProxy } from "../utils/mdxProxy";

const useFetchManga = (mangaId: string) => {
  const url =
    `https://api.mangadex.org/manga/${mangaId}` +
    `?includes[]=cover_art&includes[]=artist&includes[]=author`;

  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchManga = () => {
    setIsLoading(true);
    axios
      .get(mdxProxy(url))
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
  }, [mangaId]);

  return { data, isLoading, error, refetch: fetchManga };
};

export default useFetchManga;
