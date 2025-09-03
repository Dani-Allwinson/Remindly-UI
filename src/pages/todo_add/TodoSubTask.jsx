import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { Box, Checkbox, Grid } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
const TodoSubTask = ({ taskInfo, deleteTask, completedTask }) => {
  const [taskChecked, setTaskChecked] = useState(false);
  const [isCompletedChecked, setCompletedChecked] = useState(null);
  return (
    <>
      <Grid container alignItems={"center"}>
        <Grid size={1.5}>
          <Checkbox
            sx={{
              color: "#61758A",
              borderWidth: 0.3,
            }}
            value="Completed"
            checked={taskChecked}
            onChange={(e) => {
              console.log(e);
              setTaskChecked((prev) => !prev);
              completedTask(taskInfo.id);
              setCompletedChecked(taskInfo.id);
            }}
            color="primary"
          />
        </Grid>

        <Grid size={8.5}>
          <Typography
            variant="body1"
            color="initial"
            sx={{
              textDecoration:
                isCompletedChecked === taskInfo.id ? "line-through" : "none",
            }}
          >
            {taskInfo.name}
          </Typography>
        </Grid>
        <Grid size={2}>
          <IconButton
            aria-label="delete"
            onClick={() => {
              console.log("delete");
              deleteTask(taskInfo.id);
            }}
          >
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};
export default TodoSubTask;
