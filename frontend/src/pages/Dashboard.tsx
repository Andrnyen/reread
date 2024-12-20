import { Box } from "@mui/material";
import MangaSwiper from "../components/MangaSwiper";
import MyContainer from "../components/MyContainer";

export default function Dashboard() {
  return (
    <MyContainer>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          height: "100vh",
          p: { xs: 2, sm: 3, md: 3, ld: 2 },
        }}
      >
        <MangaSwiper
          title="Popular"
          endpoint="https://api.mangadex.org/manga?limit=30&includes[]=cover_art&contentRating%5B%5D=safe&order%5BfollowedCount%5D=desc"
        ></MangaSwiper>

        <MangaSwiper
          title="Latest"
          endpoint="https://api.mangadex.org/manga?limit=30&includes[]=cover_art&contentRating%5B%5D=safe&order%5BlatestUploadedChapter%5D=desc"
        ></MangaSwiper>
      </Box>
    </MyContainer>
  );
}
