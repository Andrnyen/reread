import { Box, Typography } from "@mui/material";
import useFetchMangas from "../hooks/fetchMangas";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import MangaCard from "./MangaCard";

import MyCircularProgress from "./MyCircularProgress";

interface MangaSwiperProp {
  title: string;
  endpoint: string;
}

export default function MangaSwiper({ title, endpoint }: MangaSwiperProp) {
  const {
    data: mangas,
    isLoading: loading,
    error: e,
  } = useFetchMangas(endpoint);

  if (e) {
    return (
      <Typography variant="h6" color="error">
        Error: {e}
      </Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h4" align="left" sx={{ pt: 1, pb: 1 }}>
        {title}
      </Typography>

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
        {loading ? (
          <MyCircularProgress></MyCircularProgress>
        ) : (
          mangas.map((manga) => {
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
          })
        )}
      </Swiper>
    </Box>
  );
}
