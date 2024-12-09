import {
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { useManga } from "../services/MangaContext";
import Slider from "react-slick";
import { slickSettings } from "../App";

export default function Dashboard() {
  const { mangas, isLoading, error } = useManga();

  if (isLoading) return <CircularProgress />;
  if (error)
    return (
      <Typography variant="h6" color="error">
        Error: {error}
      </Typography>
    );

  console.log(mangas);

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Popular
      </Typography>
      <Slider {...slickSettings}>
        {mangas.map((manga) => {
          const coverArt = manga.relationships.find(
            (e) => e.type === "cover_art"
          );
          const coverArtFileName: string = coverArt
            ? coverArt.attributes?.fileName
              ? coverArt.attributes!.fileName
              : ""
            : "";
          return (
            <Card
              key={manga.id}
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {coverArtFileName ? (
                <CardMedia
                  component="img"
                  alt={manga.attributes.title.en}
                  sx={{
                    height: 300,
                    objectFit: "cover",
                  }}
                  image={`https://uploads.mangadex.org/covers/${manga.id}/${coverArtFileName}`}
                  title={manga.attributes.title.en}
                />
              ) : (
                <div
                  style={{
                    height: 300,
                    backgroundColor: "#ccc",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  No cover art
                </div>
              )}
              <CardContent>
                <Typography variant="h6" noWrap>
                  {manga.attributes.title.en
                    ? manga.attributes.title.en
                    : manga.attributes.altTitles.filter((e) => "en" in e)[0].en}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Slider>
    </Container>
  );
}
