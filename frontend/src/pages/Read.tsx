import { Box, Typography } from "@mui/material";
import MyContainer from "../components/MyContainer";
import BackButton from "../components/BackButton";
import { useParams } from "react-router-dom";
import useFetchMangaPages from "../hooks/fetchMangaPages";
import MyCircularProgress from "../components/MyCircularProgress";
import MangaChapterViewer from "../components/MangaChapterViewer";
import getScanlationGroup from "../hooks/getScanlationGroup";

export default function Read() {
  const { volumeId, chapterId } = useParams();

  const {
    data: mangaPages,
    isLoading: loading,
    error: e,
  } = useFetchMangaPages(
    `https://api.mangadex.org/at-home/server/${chapterId}?includes%5B%5D=scanlation_group`
  );

  const { group: scanlationGroup, error: scanlationError } = getScanlationGroup(
    `https://api.mangadex.org/chapter/${chapterId}?includes%5B%5D=scanlation_group`
  );

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
        pages={mangaPages ? mangaPages.data : []}
      ></MangaChapterViewer>

      <p>
        Scanlation by{" "}
        {
          scanlationGroup?.find((e) => e.type === "scanlation_group")
            ?.attributes.name
        }
      </p>
    </MyContainer>
  );
}
