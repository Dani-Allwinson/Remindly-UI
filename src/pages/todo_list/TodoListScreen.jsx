import { Box, Container, Grid, Typography } from "@mui/material";
import NoDataFound from "../../components/NoDataFound";
import { useState } from "react";
import TodoTile from "../../components/TodoTile";
import ApiServices from "../../services/ApiServices";
const TodoListScreen = ({ data }) => {
  const [tileChecked, setTileChecked] = useState(false);
  // async function deleteItem(id) {
  //   await ApiServices.delete(`/todo/${id}`);
  // }

  if (data != undefined && data.length == 0) {
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
    <Container
      sx={{
        marginTop: 3,
      }}
    >
      {data.map((x) => (
        <TodoTile
          key={x.Id}
          isTileChecked={tileChecked}
          setTileChecked={setTileChecked}
          // deleteToDoItem={deleteItem}
          tileInfo={x}
        />
      ))}
    </Container>
  );
};

export default TodoListScreen;
