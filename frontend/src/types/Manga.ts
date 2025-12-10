export type Title = { en: string };

export type Manga = {
  id: string;
  attributes: {
    title: Title;
    altTitles: Title[];
    description: { en: string };
  };
  relationships: {
    attributes?: {
      fileName: string;
    };
    type: string;
    id: string;
  }[];
};

export type Chapter = {
  chapter: string;
  id: string;
};

export type Volume = {
  volume: string;
  chapters: Record<string, Chapter>;
};

export type Volumes = Record<string, Volume>;

export type MangaPages = {
  baseUrl: string;
  hash: string;
  pages: string[];
};
