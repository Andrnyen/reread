import {
  AppBar,
  Box,
  CircularProgress,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useManga } from "../services/MangaContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import MangaCard from "../components/MangaCard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import "swiper/css";

export default function Dashboard() {
  const { mangas, isLoading, error } = useManga();

  if (isLoading)
    return (
      <div>
        <CircularProgress />
      </div>
    );
  if (error)
    return (
      <Typography variant="h6" color="error">
        Error: {error}
      </Typography>
    );
  console.log(mangas);
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
            aria-label="profile"
          >
            <BookmarkIcon fontSize="inherit" />
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
        <Typography variant="h4" align="left" sx={{ pb: 2 }}>
          Featured
        </Typography>
        <Box>
          <Swiper
            spaceBetween={10}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Autoplay]}
            className="mySwiper"
            breakpoints={{
              640: {
                slidesPerView: 4,
              },
              768: {
                slidesPerView: 5,
              },
              1024: {
                slidesPerView: 7,
              },
              0: {
                slidesPerView: 3,
              },
            }}
          >
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
                <SwiperSlide key={manga.id}>
                  <MangaCard
                    manga={manga}
                    coverArtFileName={coverArtFileName}
                  ></MangaCard>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
      </Box>
    </Container>
  );
}
