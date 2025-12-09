import { Box, CardMedia, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import MyContainer from "../components/MyContainer";
import useFetchManga from "../hooks/fetchManga";
import MangaDescription from "../components/MangaDescription";
import MyCircularProgress from "../components/MyCircularProgress";
import BackButton from "../components/BackButton";
import MangaAccordion from "../components/MangaAccordion";
import useFetchMangaVols from "../hooks/fetchMangaVols";

export default function MangaDesc() {
  const { mangaId } = useParams();

  const {
    data: volumes,
    isLoading: volumesLoading,
    error: volumesError,
  } = useFetchMangaVols(mangaId);

  const {
    data: manga,
    isLoading: mangaLoading,
    error: mangaError,
  } = useFetchManga(mangaId);

  if (volumesError || mangaError) {
    return (
      <Typography variant="h6" color="error">
        Error: {volumesError ? volumesError : mangaError}
      </Typography>
    );
  }

  const coverArt = manga
    ? manga.relationships.find((e) => e.type === "cover_art")
    : "";

  const coverArtFileName: string = coverArt
    ? coverArt.attributes?.fileName
      ? coverArt.attributes!.fileName
      : ""
    : "";

  const title = manga?.attributes?.title?.en ?? "Title Not Found";

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
          {title.length > 50 ? title.slice(0, 50) : title}
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
