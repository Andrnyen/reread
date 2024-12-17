import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper/modules";
import "swiper/css";

interface MangaChapterProps {
  pages: string[];
  hash: string;
}

export default function MangaChapterViewer({ pages, hash }: MangaChapterProps) {
  return (
    <Swiper
      modules={[Keyboard]}
      keyboard={{ enabled: true }}
      slidesPerView={1}
      loop={false}
    >
      {pages.map((url, index) => (
        <SwiperSlide key={index}>
          <img
            src={`https://uploads.mangadex.org/data/${hash}/${url}`}
            alt={`Page ${index + 1}`}
            style={{
              width: "100%",
              objectFit: "cover", // Ensures the image fits without cropping
              backgroundColor: "#000", // Adds a dark background
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
