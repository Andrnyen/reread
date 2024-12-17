import { AppBar, IconButton, Toolbar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SearchIcon from "@mui/icons-material/Search";

export default function MyAppBar() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#242424",
      }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="profile"
        >
          <AccountCircleIcon fontSize="inherit" />
        </IconButton>

        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="bookmark"
        >
          <BookmarkIcon fontSize="inherit" />
        </IconButton>

        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="search"
        >
          <SearchIcon fontSize="inherit" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
