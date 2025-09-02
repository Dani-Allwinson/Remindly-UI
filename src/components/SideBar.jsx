import { Box, Typography } from "@mui/material";
import FavIcon from "../assets/notification_logo.png";
import { useLocation, useNavigate } from "react-router-dom";

const SideBar = ({ items, children }) => {
  const navigate = useNavigate();
  const routeName = useLocation();
  function navigateTo(route) {
    navigate(route);
  }
  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Box
        sx={{
          backgroundColor: "#fff",
          width: 250,
          height: "100vh",
          borderRight: 1,
          borderRightColor: "#dbd8d8ff",
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 2,
            borderBottom: 1,
            borderBottomColor: "#dbd8d8ff",
          }}
        >
          <img src={FavIcon} alt="logo" width={38} height={38} />
          <Typography variant="h6" sx={{ fontWeight: 600, ml: 1 }}>
            Remindly
          </Typography>
        </Box>

        {/* Nav Items */}
        <Box sx={{ m: 2 }}>
          {items.map((x) => (
            <Box
              key={x.id}
              sx={{
                display: "flex",
                gap: 2,
                p: 1.5,
                m: 2,
                alignItems: "center",
                backgroundColor:
                  routeName.pathname === x.navigateTo
                    ? "#d2d2d2b7"
                    : "transparent",
                borderRadius: 2,
                cursor: "pointer",
                transition: "background-color 0.2s ease",
                "&:hover": { backgroundColor: "#eaeaea" },
              }}
              onClick={() => navigateTo(x.navigateTo)}
            >
              {x.icon}
              <Typography variant="body1" sx={{ fontSize: 14 }}>
                {x.title}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, backgroundColor: "#f9f9f9" }}>{children}</Box>
    </Box>
  );
};
export default SideBar;
