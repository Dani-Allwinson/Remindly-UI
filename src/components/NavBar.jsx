import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import FavIcon from "../assets/notification_logo.png";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";

const NavBar = ({ children }) => {
  return (
    <>
      <AppBar
        position="static"
        color="inherit"
        sx={{
          boxShadow: "none",
          background: "inherit",
        }}
      >
        <Toolbar sx={{ gap: 2, justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <img src={FavIcon} alt="logo" width={38} height={38} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Remindly
            </Typography>
          </Box>
          <Container maxWidth="lg">{children}</Container>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
