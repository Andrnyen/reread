import { Box, Typography } from "@mui/material";
import MyContainer from "../components/MyContainer";
import BackButton from "../components/BackButton";
import { useParams } from "react-router-dom";
import useFetchMangaPages from "../hooks/fetchMangaPages";
import MyCircularProgress from "../components/MyCircularProgress";
import MangaChapterViewer from "../components/MangaChapterViewer";
import getScanlationGroup from "../hooks/getScanlationGroup";

export default function Read() {
  const { chapterId } = useParams();

  const {
    data: mangaPages,
    isLoading: loading,
    error: e,
  } = useFetchMangaPages(chapterId!);

  const { groupName: scanlationGroup, error: scanlationError } =
    getScanlationGroup(chapterId);

  if (e || scanlationError) {
    return (
      <Typography variant="h6" color="error">
        Error: {e ? e : scanlationError}
      </Typography>
    );
  }

  return loading ? (
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
      </Box>

      <MangaChapterViewer
        hash={mangaPages ? mangaPages.hash : ""}
        pages={mangaPages ? mangaPages.pages : []}
      ></MangaChapterViewer>

      <p>Scanlation by {scanlationGroup ?? "Unknown"}</p>
    </MyContainer>
  );
}
