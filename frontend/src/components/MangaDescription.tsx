import { useState } from "react";
import { Typography, Button, Box } from "@mui/material";

export default function MangaDescription({
  description,
}: {
  description: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const MAX_LENGTH = 400;

  return (
    <Box sx={{ textAlign: "left", p: 1 }}>
      <Typography
        sx={{
          display: "inline",
          typography: {
            xs: "body2",
            sm: "body2",
            md: "body1",
            lg: "body1",
          },
        }}
      >
        {isExpanded ? description : `${description.slice(0, MAX_LENGTH)}...`}{" "}
      </Typography>
      {description.length > MAX_LENGTH && (
        <Button
          onClick={toggleDescription}
          size="small"
          sx={{ textTransform: "none", color: "#00aaff", ml: 1 }}
        >
          {isExpanded ? "See Less" : "See More"}
        </Button>
      )}
    </Box>
  );
}
