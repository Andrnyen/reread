import { useEffect, useState } from "react";
import axios from "axios";
// import { mdxProxy } from "../utils/mdxProxy";

const useFetchMangaVols = (mangaId: string) => {
  const url = `https://api.mangadex.org/manga/${mangaId}/aggregate?translatedLanguage[]=en`;

  const [data, setData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMangaVols = () => {
    setIsLoading(true);
    axios
      .get(url)
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
