import {
  TextareaAutosize,
  FormControl,
  FormLabel,
  Box,
  MenuItem,
  ButtonGroup,
  Button,
} from "@mui/material";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const TodoAddScreen = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "end",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 3,
            }}
          >
            {/* Task Name */}
            <Box>
              <FormLabel sx={{ color: "#000" }}>Task Name</FormLabel>
              <TextField
                fullWidth
                id="task-name"
                placeholder="e.g., Design the new landing page"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </Box>

            {/* Description */}
            <Box>
              <FormLabel sx={{ color: "#000" }}>Description</FormLabel>
              <TextField
                id="task-description"
                fullWidth
                multiline
                placeholder="e.g., Create mockups and prototypes for the new website landing page."
                value={taskDesc}
                maxRows={4}
                minRows={4}
                rows={4}
                onChange={(e) => setTaskDesc(e.target.value)}
              />
            </Box>

            {/* Category */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
              }}
            >
              <Box width="20vw">
                <FormLabel sx={{ color: "#000" }}>Category</FormLabel>
                <TextField
                  select
                  fullWidth
                  id="task-category"
                  placeholder="Select Category"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                >
                  <MenuItem value="design">Design</MenuItem>
                  <MenuItem value="development">Development</MenuItem>
                  <MenuItem value="marketing">Marketing</MenuItem>
                </TextField>
              </Box>
              <Box width="20vw">
                <FormLabel sx={{ color: "#000" }}>Priority</FormLabel>
                <TextField
                  select
                  fullWidth
                  id="task-priority"
                  placeholder="Select Priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </TextField>
              </Box>
            </Box>
            {/* Due Date */}
            <Box>
              <FormLabel sx={{ color: "#000" }}>Due Date</FormLabel>
              <TextField
                fullWidth
                id="task-due-date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              height: 30,
              gap: 2,
              pt: 2,
            }}
          >
            <Button variant="contained" color="inherit">
              Clear
            </Button>
            <Button variant="contained">Save</Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default TodoAddScreen;
