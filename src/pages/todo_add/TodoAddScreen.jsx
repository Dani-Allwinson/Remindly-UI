import { FormLabel, Box, MenuItem, Button } from "@mui/material";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { useEffect, useRef, useState } from "react";
import ApiServices from "../../services/ApiServices";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSnackBar } from "../../context/SnackbarContext";
import { useProgressSpinner } from "../../context/SpinnerLoadingContext";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import TodoSubTask from "./TodoSubTask";

const TodoAddScreen = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [subTaskList, setSubTaskList] = useState([]);
  const [subTask, setSubTask] = useState("");
  const navigate = useNavigate();
  const { showSnackBar } = useSnackBar();
  const { showSpinner, hideSpinner } = useProgressSpinner();
  const count = useRef(1);
  const listRef = useRef(null);
  const routeName = useLocation();
  const { id } = useParams();
  const taskId = useRef(0);
  const taskLastUpdateDate = useRef(null);

  function getTodo() {
    const response = ApiServices.get(`/todo/${id}`);
    response.then((res) => {
      const date = res.DueDate.toString().split("T")[0];
      setTaskName(res.Title);
      setTaskDesc(res.Description);
      setSubTaskList(res.Subtasks);
      taskId.current = res.Id;
      taskLastUpdateDate.current = res.LastUpdatedDate;
      setDueDate(date);
    });
  }

  useEffect(() => {
    if (routeName.pathname.includes("/edit")) {
      getTodo();
    }
  }, [routeName.pathname]);

  function addSubTask(value) {
    setSubTaskList((prev) => [
      ...prev,
      {
        Id: count.current++,
        Name: value,
        Status: "Pending",
        CreatedBy: "Dani",
      },
    ]);
    setSubTask("");
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }

  function updateTask() {
    showSpinner();
    var payload = {
      Title: taskName,
      Description: taskDesc,
      DueDate: new Date(dueDate),
      Status: "Pending",
      UpdatedBy: "Dani",
      SubTasks: subTaskList,
    };
    if (taskName != "" && taskDesc != "" && dueDate != "") {
      var response = ApiServices.update(`/todo/${id}`, payload);
      response
        .then(() => {
          navigate("/dashboard");
        })
        .catch((e) => {
          showSnackBar(e.reponse.data);
        })
        .finally(() => hideSpinner());
    }
  }

  function deleteSubTask(value) {
    var newSubTasks = subTaskList.filter((x) => x.Id !== value);
    setSubTaskList(newSubTasks);
  }

  function handleSave() {
    if (routeName.pathname.includes("/edit")) {
      return updateTask();
    } else {
      saveTask();
    }
  }
  async function saveTask() {
    showSpinner();
    var payload = {
      Title: taskName,
      Description: taskDesc,
      DueDate: dueDate,
      Status: "Pending",
      UpdatedBy: "Dani",
      SubTasks: subTaskList,
    };
    if (taskName != "" && taskDesc != "" && dueDate != "") {
      var response = ApiServices.post("/todo", payload);
      response
        .then(() => {
          navigate("/dashboard");
        })
        .catch((e) => {
          showSnackBar(e.reponse.data);
        })
        .finally(() => hideSpinner());
    }
  }

  function clear() {
    setTaskName("");
    setCategoryName("");
    setPriority("");
    setDueDate("");
    setTaskDesc("");
  }
  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch", // stretch children to equal width
            backgroundColor: "#fff",
            padding: 3,
            borderRadius: 2,
            width: "40vw",
            maxHeight: "80vh",
            boxShadow: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {/* Task Name */}
            <Box>
              <FormLabel sx={{ color: "#000", fontWeight: "bold" }}>
                Task Name
              </FormLabel>
              <TextField
                fullWidth
                id="task-name"
                placeholder="e.g., Design the new landing page"
                value={taskName}
                sx={{
                  "& .MuiInputBase-root": {
                    height: 40, // custom height
                  },
                }}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </Box>

            {/* Description */}
            <Box>
              <FormLabel sx={{ color: "#000", fontWeight: "bold" }}>
                Description
              </FormLabel>
              <TextField
                id="task-description"
                fullWidth
                multiline
                placeholder="e.g., Create mockups and prototypes for the new website landing page."
                value={taskDesc}
                minRows={4}
                onChange={(e) => setTaskDesc(e.target.value)}
              />
            </Box>

            {/* Category & Priority */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box flex={1}>
                <FormLabel sx={{ color: "#000", fontWeight: "bold" }}>
                  Category
                </FormLabel>
                <TextField
                  select
                  fullWidth
                  sx={{
                    "& .MuiInputBase-root": {
                      height: 40, // custom height
                    },
                  }}
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
              <Box flex={1}>
                <FormLabel sx={{ color: "#000", fontWeight: "bold" }}>
                  Priority
                </FormLabel>
                <TextField
                  select
                  fullWidth
                  sx={{
                    "& .MuiInputBase-root": {
                      height: 40, // custom height
                    },
                  }}
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
              <FormLabel sx={{ color: "#000", fontWeight: "bold" }}>
                Due Date
              </FormLabel>
              <TextField
                fullWidth
                sx={{
                  "& .MuiInputBase-root": {
                    height: 40, // custom height
                  },
                }}
                id="task-due-date"
                type="date"
                value={dueDate}
                onChange={(e) => {
                  setDueDate(e.target.value);
                }}
              />
            </Box>

            {/* Sub Tasks */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box flex={1}>
                <FormLabel sx={{ color: "#000", fontWeight: "bold" }}>
                  Sub Tasks
                </FormLabel>
                <TextField
                  fullWidth
                  sx={{
                    "& .MuiInputBase-root": {
                      height: 40, // custom height
                    },
                  }}
                  id="task-sub-tasks"
                  placeholder="Add a new sub task..."
                  value={subTask}
                  onChange={(e) => setSubTask(e.target.value)}
                />
              </Box>
              <Button
                aria-label="add-icon"
                variant="outlined"
                sx={{
                  minWidth: 40,
                  height: 40,
                  mt: 3,
                }}
                onClick={() => addSubTask(subTask)}
              >
                <AddOutlinedIcon />
              </Button>
            </Box>
            <Box
              ref={listRef}
              sx={{
                maxHeight: 60,
                overflowY: "auto",
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              {subTaskList &&
                Array.isArray(subTaskList) &&
                subTaskList.map((x, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                    }}
                  >
                    <TodoSubTask taskInfo={x} deleteTask={deleteSubTask} />
                  </Box>
                ))}
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              pt: 3,
            }}
          >
            <Button
              variant="contained"
              sx={{ textTransform: "none" }}
              color="inherit"
              onClick={() => clear()}
            >
              Clear
            </Button>
            <Button
              variant="contained"
              sx={{ textTransform: "none" }}
              onClick={() => handleSave()}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default TodoAddScreen;
