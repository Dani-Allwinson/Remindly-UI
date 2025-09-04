import { Chip, Box } from "@mui/material";
const TodoSubTask = ({ taskInfo, deleteTask }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Chip label={taskInfo.Name} onDelete={() => deleteTask(taskInfo.Id)} />
      </Box>
    </>
  );
};
export default TodoSubTask;
