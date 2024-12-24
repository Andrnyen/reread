import { Box, CardMedia, IconButton, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import MyContainer from "../components/MyContainer";
import useFetchManga from "../hooks/fetchManga";
import MangaDescription from "../components/MangaDescription";
import MyCircularProgress from "../components/MyCircularProgress";
import BackButton from "../components/BackButton";
import MangaAccordion from "../components/MangaAccordion";
import useFetchMangaVols from "../hooks/fetchMangaVols";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { getAuth } from "firebase/auth";
import {
  handleAddBookmarkManga,
  handleRemoveBookmarkManga,
  isMangaBookmarked,
} from "../services/FirestoreServices";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useEffect, useState } from "react";

export default function MangaDesc() {
  const { mangaId } = useParams();
  const currUser = getAuth().currentUser;
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  useEffect(() => {
    async function checkIfBookmarked() {
      setIsBookmarked(await isMangaBookmarked(currUser!.uid, mangaId!));
    }
    checkIfBookmarked();
  }, []);

  const {
    data: volumes,
    isLoading: volumesLoading,
    error: volumesError,
  } = useFetchMangaVols(
    `https://api.mangadex.org/manga/${mangaId}/aggregate?translatedLanguage%5B%5D=en`
  );

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

  const coverArt = manga
    ? manga.relationships.find((e) => e.type === "cover_art")
    : "";

  const coverArtFileName: string = coverArt
    ? coverArt.attributes?.fileName
      ? coverArt.attributes!.fileName
      : ""
    : "";

  function bookMarkManga() {
    if (currUser && mangaId) {
      isBookmarked
        ? handleRemoveBookmarkManga(currUser?.uid, mangaId)
        : handleAddBookmarkManga(currUser?.uid, mangaId);
      setIsBookmarked(!isBookmarked);
    }
  }

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
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <BackButton />
          <IconButton onClick={bookMarkManga}>
            {isBookmarked ? (
              <BookmarkIcon sx={{ color: "white" }}></BookmarkIcon>
            ) : (
              <BookmarkBorderIcon sx={{ color: "white" }}></BookmarkBorderIcon>
            )}
          </IconButton>
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
