import { Box, CardMedia, Typography } from "@mui/material";
import useFetchMangaDesc from "../hooks/fetchMangaVols";
import { useParams } from "react-router-dom";
import MyContainer from "../components/MyContainer";
import useFetchManga from "../hooks/fetchManga";
import MangaDescription from "../components/MangaDescription";
import MyCircularProgress from "../components/MyCircularProgress";
import BackButton from "../components/BackButton";
import MangaAccordion from "../components/MangaAccordion";

export default function MangaDesc() {
  const { mangaId } = useParams();

  const {
    data: volumes,
    isLoading: volumesLoading,
    error: volumesError,
  } = useFetchMangaDesc(`https://api.mangadex.org/manga/${mangaId}/aggregate`);

  const {
    data: manga,
    isLoading: mangaLoading,
    error: mangaError,
  } = useFetchManga(
    `https://api.mangadex.org/manga/${mangaId}?includes%5B%5D=cover_art`
  );

  if (volumesError || mangaError) {
    return (
      <Typography variant="h6" color="error">
        Error: {volumesError ? volumesError : mangaError}
      </Typography>
    );
  }

  console.log(manga);
  console.log(volumes);

  const coverArt = manga
    ? manga.relationships.find((e) => e.type === "cover_art")
    : "";

  const coverArtFileName: string = coverArt
    ? coverArt.attributes?.fileName
      ? coverArt.attributes!.fileName
      : ""
    : "";

  return volumesLoading || mangaLoading ? (
    <MyCircularProgress></MyCircularProgress>
  ) : (
    <MyContainer>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: { xs: 2, sm: 3, md: 3, lg: 3 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
          }}
        >
          <BackButton />
        </Box>

        <CardMedia
          component="img"
          alt={manga ? manga.attributes.title.en : ""}
          image={`https://uploads.mangadex.org/covers/${mangaId}/${coverArtFileName}`}
          title={manga ? manga.attributes.title.en : ""}
          sx={{
            height: {
              xs: 200, // Small screens
              sm: 250, // Medium screens
              md: 300, // Large screens
              lg: 400, // Extra-large screens
            },
            objectFit: "contain",
            p: 1,
          }}
        />

        <Typography variant="h4" sx={{ p: 1 }}>
          {manga
            ? manga.attributes.title.en.length > 50
              ? manga.attributes.title.en.slice(0, 50)
              : manga.attributes.title.en
            : "Title Not Found"}
        </Typography>

        <MangaDescription
          description={
            manga ? manga.attributes.description.en : "No Description Found"
          }
        ></MangaDescription>

        <MangaAccordion volumes={volumes}></MangaAccordion>
      </Box>
    </MyContainer>
  );
}
