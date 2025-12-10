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
        <MangaSwiper title="Popular" endpoint="/popular"></MangaSwiper>

        <MangaSwiper title="Latest" endpoint="/latest"></MangaSwiper>
      </Box>
    </MyContainer>
  );
}
