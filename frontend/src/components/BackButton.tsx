import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function BackButton() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<ArrowBackIcon />} // Optional: Adds a back arrow icon
      onClick={handleBack}
      sx={{
        backgroundColor: "transparent",
      }}
    >
      Back
    </Button>
  );
}
