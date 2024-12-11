import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Manga } from "../types/Manga";

interface MangaCardProps {
  manga: Manga;
  coverArtFileName: string;
}

export default function MangaCard({ manga, coverArtFileName }: MangaCardProps) {
  return (
    <Card>
      {coverArtFileName ? (
        <CardMedia
          component="img"
          alt={manga.attributes.title.en}
          image={`https://uploads.mangadex.org/covers/${manga.id}/${coverArtFileName}`}
          title={manga.attributes.title.en}
          sx={{ height: 250 }}
        />
      ) : (
        <div
          style={{
            backgroundColor: "#ccc",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 300,
          }}
        >
          No cover art
        </div>
      )}
      <CardContent sx={{ height: 10, backgroundColor: "#3d3d3d" }}>
        <Typography sx={{ color: "white" }} noWrap>
          {manga.attributes.title.en
            ? manga.attributes.title.en
            : manga.attributes.altTitles.filter((e) => "en" in e)[0].en}
        </Typography>
      </CardContent>
    </Card>
  );
}
