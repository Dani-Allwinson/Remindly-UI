import { useEffect, useState } from "react";
import ApiServices from "../../services/ApiServices";
import { useSnackBar } from "../../context/SnackbarContext";
import TodoListScreen from "../todo_list/TodoListScreen";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useProgressSpinner } from "../../context/SpinnerLoadingContext";

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};
const HomeScreen = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const { showSnackBar } = useSnackBar();
  const { showSpinner, hideSpinner } = useProgressSpinner();

  function fetchData() {
    showSpinner();
    setTimeout(() => {
      var response = ApiServices.get("/todo/list");
      console.log(response);
      response
        .then((res) => {
          setTodos(res);
        })
        .catch((e) => {
          showSnackBar(e.response.data);
        })
        .finally(() => hideSpinner());
    }, 500);
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <TodoListScreen data={todos}></TodoListScreen>
      <Fab
        sx={{
          backgroundColor: "#747272ff",
          color: "#fff",
          ":hover": {
            backgroundColor: "#000",
            color: "#fff",
          },
        }}
        aria-label="add"
        style={fabStyle}
        onClick={() => {
          navigate("/add");
        }}
      >
        <AddIcon />
      </Fab>
    </>
  );
};

export default HomeScreen;
