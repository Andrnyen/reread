import { useEffect, useState } from "react";
import axios from "axios";
import { mdxProxy } from "../utils/mdxProxy";
import { MangaPages } from "../types/Manga";

const useFetchMangaPages = (chapterId: string) => {
  const url = `https://api.mangadex.org/at-home/server/${chapterId}`;

  const [data, setData] = useState<MangaPages | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPages = () => {
    setIsLoading(true);

    axios
      .get(mdxProxy(url))
      .then((response) => {
        const baseUrl = response.data.baseUrl;
        const hash = response.data.chapter.hash;
        const pages = response.data.chapter.data;

        setData({
          baseUrl: baseUrl,
          hash: hash,
          pages: pages,
        });
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
