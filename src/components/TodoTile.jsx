import { Box, Checkbox, Typography, IconButton, Grid } from "@mui/material";
import Tag from "./Tags";
import { convertDateTime } from "../utils/CommonUtils";
import InsertInvitationOutlinedIcon from "@mui/icons-material/InsertInvitationOutlined";
const TodoTile = ({
  isTileChecked,
  setTileChecked,
  tileInfo,
  // deleteToDoItem,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: 300,
        backgroundColor: "#fff",
        borderRadius: 3,
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "space-between",
          width: "inherit",
        }}
      >
        <Box>
          <Tag type={"Home"}></Tag>
        </Box>
        <Checkbox
          sx={{
            color: "#61758A",
            borderWidth: 0.3,
          }}
          value="test"
          checked={isTileChecked}
          onChange={() => {
            setTileChecked((prev) => !prev);
          }}
          color="primary"
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
        }}
      >
        <Typography variant="h6" color="initial">
          {tileInfo.Title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
          }}
        >
          <InsertInvitationOutlinedIcon
            sx={{
              width: 16,
              height: 16,
              color: "#61758A",
            }}
          ></InsertInvitationOutlinedIcon>
          <Typography
            variant="body1"
            color="initial"
            sx={{
              color: "#61758A",
              fontSize: 12,
            }}
          >
            Due: {convertDateTime(tileInfo.DueDate)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TodoTile;
