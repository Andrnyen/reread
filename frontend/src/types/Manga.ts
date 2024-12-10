export type Title = { en: string };

export type Manga = {
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
