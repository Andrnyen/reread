import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper/modules";
import { MangaPages } from "../types/Manga";

export default function MangaChapterViewer({
  baseUrl,
  pages,
  hash,
}: MangaPages) {
  if (!pages || !Array.isArray(pages)) return <div>No pages found.</div>;

  return (
    <Swiper
      modules={[Keyboard]}
      keyboard={{ enabled: true }}
      slidesPerView={1}
      loop={false}
    >
      {pages.map((url, index) => (
        <SwiperSlide key={index}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#000", // Adds a dark background
            }}
          >
            <img
              src={`${baseUrl}/data/${hash}/${url}`}
              onError={(e) => {
                e.currentTarget.src = `${baseUrl}/data-saver/${hash}/${url}`;
              }}
              alt={`Page ${index + 1}`}
              style={{
                maxWidth: "100%",
                objectFit: "contain", // Ensures the image fits without cropping
              }}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
