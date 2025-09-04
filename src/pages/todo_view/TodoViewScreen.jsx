import { useEffect, useState } from "react";
import ApiServices from "../../services/ApiServices.js";
import { useNavigate, useParams } from "react-router-dom";
import TaskProgressView from "../../components/TaskProgressView.jsx";
import {
  Box,
  Grid,
  Typography,
  Container,
  IconButton,
  Button,
} from "@mui/material";
import { useProgressSpinner } from "../../context/SpinnerLoadingContext.jsx";
import NoDataFound from "../../components/NoDataFound.jsx";
import CheckBox from "../../components/CheckBox.jsx";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import PriorityHighOutlinedIcon from "@mui/icons-material/PriorityHighOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import Tag from "../../components/Tags.jsx";
import { convertDateTime } from "../../utils/CommonUtils.js";
import { useSnackBar } from "../../context/SnackbarContext.jsx";

const TodoViewScreen = () => {
  const [todo, setTodo] = useState(null);
  const { id } = useParams();
  const { showSnackBar } = useSnackBar();
  const navigate = useNavigate();
  const { showSpinner, hideSpinner } = useProgressSpinner();

  function getTodo() {
    showSpinner();
    var response = ApiServices.get(`/todo/${id}`);

    response
      .then((res) => {
        setTodo(res);
      })
      .finally(() => {
        hideSpinner();
      });
  }

  function updateTask() {
    showSpinner();
    var payload = {
      Title: todo.Title,
      Description: todo.Description,
      DueDate: new Date(todo.DueDate),
      Status: todo.Status,
      UpdatedBy: todo.UpdatedBy,
      SubTasks: todo.Subtasks,
    };
    var response = ApiServices.update(`/todo/${id}`, payload);
    response
      .then(() => {
        navigate(`/view/${id}`);
      })
      .catch((e) => {
        showSnackBar(e.reponse.data);
      })
      .finally(() => hideSpinner());
  }

  useEffect(() => {
    getTodo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!todo) {
    return (
      <Grid
        container
        spacing={1}
        direction="column"
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        wrap="wrap"
      >
        <Grid
          sx={{
            margin: 0,
            paddingTop: "40vh",
          }}
        >
          <NoDataFound />
        </Grid>
      </Grid>
    );
  }

  return (
    <>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          pt: 10,
        }}
      >
        <Box>
          <TaskTitleCard id={id} title={todo.Title} desc={todo.Description} />
          <TaskProgressView subTaskData={todo.Subtasks || []} />
          <SubTaskCard
            todo={todo.Subtasks || []}
            setTodo={setTodo}
            handleSave={updateTask}
          />
        </Box>
        <TaskDetailsCard task={todo} />
      </Container>
    </>
  );
};

const TaskTitleCard = ({ id, title, desc }) => {
  const navigate = useNavigate();
  async function deleteItem() {
    await ApiServices.delete(`/todo/${id}`).then(() => {
      navigate("/dashboard");
    });
  }
  function navigateToEdit() {
    navigate(`/edit/${id}`);
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "start",
          gap: 1,
          alignContent: "center",
          margin: 2,
          padding: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: 24,
                fontWeight: 600,
                width: 500,
                wordWrap: "break-word",
              }}
              color="initial"
            >
              {title}
            </Typography>
          </Box>
          <Box>
            <IconButton aria-label="edit" onClick={() => navigateToEdit()}>
              <EditOutlinedIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => deleteItem()}>
              <DeleteOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
        <Typography
          variant="body2"
          color="initial"
          sx={{
            color: "grey",
            width: 500,
            wordWrap: "break-word",
          }}
        >
          {desc}
        </Typography>
      </Box>
    </>
  );
};

const TaskDetailsCard = ({ task }) => {
  return (
    <>
      <Box
        key={task.Id}
        sx={{
          backgroundColor: "#fff",
          padding: 3,
          margin: 2,
          borderRadius: 5,
          width: 200,
          gap: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <CategoryOutlinedIcon
            sx={{
              color: "#4fbd8fff",
            }}
          />
          <Box>
            <Typography
              sx={{
                fontSize: 14,
                color: "grey",
              }}
              color="initial"
            >
              Category
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
              }}
              color="initial"
            >
              {task.Category ?? "Work"}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <PriorityHighOutlinedIcon color="error" />
          <Box>
            <Typography
              sx={{
                fontSize: 14,
                color: "grey",
              }}
              color="initial"
            >
              Priority
            </Typography>
            <Tag type={"High"}></Tag>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <CalendarTodayOutlinedIcon color="info" />
          <Box>
            <Typography
              sx={{
                fontSize: 14,
                color: "grey",
              }}
              color="initial"
            >
              Due Date
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
              }}
              color="initial"
            >
              {convertDateTime(task.DueDate)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

const SubTaskCard = ({ todo, setTodo, handleSave }) => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#fff",
          width: 525,
          margin: 2,
          padding: 3,
          borderRadius: 5,
        }}
      >
        <Typography variant="h6" color="initial" fontWeight={600}>
          Sub-tasks
        </Typography>
        <Box
          sx={{
            width: 500,
            maxHeight: "35vh",
            overflowY: "auto",
          }}
        >
          {todo.map((x, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: 1,
              }}
            >
              <CheckBox
                value={x.Status == "Completed" ? true : false}
                setValue={(value) => {
                  var currentSubTask = x;
                  currentSubTask.Status =
                    value == "true" ? "Completed" : "Pending";
                  setTodo((prev) => ({
                    ...prev,
                    Subtasks: [...prev.Subtasks],
                  }));
                }}
              />
              <Typography
                color="initial"
                sx={{
                  fontSize: 16,
                  textDecoration:
                    x.Status == "Completed" ? "line-through" : "none",
                }}
              >
                {x.Name}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            margin: 1,
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleSave()}
          >
            Save
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default TodoViewScreen;
