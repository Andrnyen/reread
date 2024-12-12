import {
  AppBar,
  Box,
  Button,
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
import MenuIcon from "@mui/icons-material/Menu";
import "swiper/css";

export default function Dashboard() {
  const { mangas, isLoading, error } = useManga();

  if (isLoading) return <CircularProgress />;
  if (error)
    return (
      <Typography variant="h6" color="error">
        Error: {error}
      </Typography>
    );

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
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          height: "100vh",
        }}
      >
        <Typography variant="h3">Popular</Typography>
        <Box sx={{ overflow: "hidden" }}>
          <Swiper
            slidesPerView={15}
            spaceBetween={10}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Autoplay]}
            className="mySwiper"
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
