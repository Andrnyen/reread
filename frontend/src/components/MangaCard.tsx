import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Manga } from "../types/Manga";
import { Link } from "react-router-dom";

interface MangaCardProps {
  manga: Manga;
  coverArtFileName: string;
}

export default function MangaCard({ manga, coverArtFileName }: MangaCardProps) {
  return (
    <Link
      to={`/manga/${manga.id}`} // Navigate to a new page based on the manga's ID
    >
      <Card
        square={true}
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        {coverArtFileName !== "" ? (
          <CardMedia
            component="img"
            alt={manga.attributes.title.en}
            image={`https://uploads.mangadex.org/covers/${manga.id}/${coverArtFileName}`}
            title={manga.attributes.title.en}
            sx={{ objectFit: "cover", aspectRatio: "0.65" }}
          />
        ) : (
          <div
            style={{
              backgroundColor: "#ccc",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            No cover art
          </div>
        )}
        <CardContent
          sx={{
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              color: "white",
              display: "-webkit-box", // Necessary for truncating multiple lines
              WebkitBoxOrient: "vertical", // Define the box orientation
              WebkitLineClamp: 1, // Limit to 2 lines (adjust as needed)
            }}
            align="center"
          >
            {manga.attributes.title.en
              ? manga.attributes.title.en
              : manga.attributes.altTitles.filter((e) => "en" in e)[0].en}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
