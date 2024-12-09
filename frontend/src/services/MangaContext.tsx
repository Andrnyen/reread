import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

type Title = { en: string };

type Manga = {
  id: string;
  attributes: {
    title: Title;
    altTitles: Title[];
  };
  relationships: {
    attributes?: {
      fileName: string;
    };
    type: string;
    id: string;
  }[];
};

type MangaContextType = {
  mangas: Manga[];
  isLoading: boolean;
  error: string | null;
};

const MangaContext = createContext<MangaContextType | undefined>(undefined);

export const useManga = (): MangaContextType => {
  const context = useContext(MangaContext);
  if (!context) {
    throw new Error("useManga must be used within a MangaProvider");
  }
  return context;
};

export const MangaProvider = ({ children }: { children: ReactNode }) => {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(
        "https://api.mangadex.org/manga?limit=30&includes[]=cover_art&order%5BfollowedCount%5D=desc"
      ) // Adjust the limit if needed
      .then((response) => {
        setMangas(response.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  return (
    <MangaContext.Provider value={{ mangas, isLoading, error }}>
      {children}
    </MangaContext.Provider>
  );
};
