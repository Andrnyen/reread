import { Box } from "@mui/material";
import MyContainer from "../components/MyContainer";
import BackButton from "../components/BackButton";

export default function Read() {
  return (
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
    </MyContainer>
  );
}
