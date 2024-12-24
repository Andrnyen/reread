import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Volumes } from "../types/Manga";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

interface MangaAccordionProps {
  volumes: Volumes;
}

export default function MangaAccordion({ volumes }: MangaAccordionProps) {
  return (
    <Container maxWidth={false} disableGutters>
      {Object.keys(volumes).map((volKey, index) => {
        return (
          <Accordion
            key={volKey}
            sx={{ width: "100%", backgroundColor: "#242424" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography sx={{ color: "white" }}>
                {`Volume ${index + 1}`}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {Object.keys(volumes[volKey].chapters).map((chapKey) => (
                  <ListItemButton
                    key={chapKey}
                    component={Link} // React Router Link for navigation
                    to={`/volume/${volumes[volKey].volume}/chapter/${volumes[volKey].chapters[chapKey].id}`}
                  >
                    <ListItemText
                      primary={`Chapter ${chapKey}`}
                      sx={{ textAlign: "left", color: "white" }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Container>
  );
}
