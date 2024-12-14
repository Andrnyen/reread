import { AppBar, Box, Container, IconButton, Toolbar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SearchIcon from "@mui/icons-material/Search";
import MangaSwiper from "../components/MangaSwiper";

export default function Dashboard() {
  return (
    <Container maxWidth={false} disableGutters>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#242424",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="profile"
          >
            <AccountCircleIcon fontSize="inherit" />
          </IconButton>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="bookmark"
          >
            <BookmarkIcon fontSize="inherit" />
          </IconButton>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="search"
          >
            <SearchIcon fontSize="inherit" />
          </IconButton>
        </Toolbar>
      </AppBar>

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
          endpoint="https://api.mangadex.org/manga?limit=30&includes[]=cover_art&order%5BfollowedCount%5D=desc"
        ></MangaSwiper>

        <MangaSwiper
          title="Latest"
          endpoint="https://api.mangadex.org/manga?limit=30&includes[]=cover_art&order%5BlatestUploadedChapter%5D=desc"
        ></MangaSwiper>
      </Box>
    </Container>
  );
}
