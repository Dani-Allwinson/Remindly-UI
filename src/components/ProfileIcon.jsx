import { Avatar, Box, Typography } from "@mui/material";
import { getProfileName } from "../utils/CommonUtils";

const ProfileIcon = ({ data }) => {
  return (
    <Box sx={{ cursor: "pointer" }}>
      <Avatar sx={{ width: 32, height: 32 }}>
        <Typography variant="body1" color="#fff">
          {getProfileName(data)}
        </Typography>
      </Avatar>
    </Box>
  );
};
export default ProfileIcon;
