import { Box, Typography } from "@mui/material";
import { getPriorityTagBG } from "../utils/CommonUtils";
import { useEffect, useState } from "react";
import { red } from "@mui/material/colors";
const Tag = ({ type }) => {
  const [BGColor, setBGColor] = useState("");
  useEffect(() => {
    setBGColor(getPriorityTagBG(type));
  }, [type]);
  return (
    <Box
      sx={{
        backgroundColor: red[100],
        width: 50,
        height: "auto",
        borderRadius: 3,
        padding: 0.1,
      }}
    >
      <Typography
        color="initial"
        sx={{
          textAlign: "center",
          fontSize: 12,
          fontWeight: 600,
          color: "red",
        }}
      >
        {type}
      </Typography>
    </Box>
  );
};
export default Tag;
