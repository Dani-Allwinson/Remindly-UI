import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Typography, IconButton, Grid } from "@mui/material";
import SideBar from "../components/SideBar";
import ProfileIcon from "../components/ProfileIcon";
import FavIcon from "../assets/notification_logo.png";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import { getTitle } from "../utils/CommonUtils";

const MainLayout = ({ children }) => {
  const routeName = useLocation();
  const [showProfile, setShowProfile] = useState(false);
  const title = getTitle(routeName.pathname.split("/")[1]);

  useEffect(() => {
    setShowProfile(["/login", "/register"].includes(routeName.pathname));
  }, [routeName]);

  const sideBarNav = [
    {
      id: 1,
      title: "Dashboard",
      icon: <GridViewOutlinedIcon />,
      navigateTo: "/dashboard",
    },
    {
      id: 2,
      title: "Category",
      icon: <CategoryOutlinedIcon />,
      navigateTo: "/category",
    },
    {
      id: 3,
      title: "Calendar",
      icon: <CalendarTodayOutlinedIcon />,
      navigateTo: "/calendar",
    },
  ];

  if (showProfile) {
    return (
      <Box
        sx={{
          padding: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img src={FavIcon} alt="logo" width={38} height={38} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Remindly
          </Typography>
        </Box>
        {children}
      </Box>
    );
  }

  return (
    <>
      <SideBar items={sideBarNav}>
        {/* <NavBar> */}
        <Box
          sx={{
            backgroundColor: "#fff",
            borderBottom: 1,
            borderBottomColor: "#dbd8d8ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: 1.9,
            px: 2,
            width: "auto",
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <IconButton aria-label="search">
              <SearchOutlinedIcon />
            </IconButton>
            <IconButton aria-label="notification">
              <NotificationsNoneOutlinedIcon />
            </IconButton>
            <ProfileIcon data="Dani Allwinson" />
          </Box>
        </Box>
        {/* </NavBar> */}
        <Box>{children}</Box>
      </SideBar>
    </>
  );
};

export default MainLayout;
