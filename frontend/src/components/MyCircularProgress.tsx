import { Box, CircularProgress } from "@mui/material";

export default function MyCircularProgress() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress sx={{ color: "white" }}></CircularProgress>
    </Box>
  );
}
