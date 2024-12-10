import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { useManga } from "../services/MangaContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import MangaCard from "../components/MangaCard";
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

  console.log(mangas);

  return (
    <Container>
      <Typography variant="h3">Popular</Typography>

      <Swiper
        slidesPerView={7}
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
    </Container>
  );
}
