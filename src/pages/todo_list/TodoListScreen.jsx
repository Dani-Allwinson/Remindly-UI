import { Box, Container, Grid, Typography } from "@mui/material";
import NoDataFound from "../../components/NoDataFound";
import TodoTile from "../../components/TodoTile";
const TodoListScreen = ({ data }) => {
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
    <Container sx={{ my: 3 }}>
      <Grid container spacing={3}>
        {data.map((x) => (
          <Grid item key={x.Id} xs={12} sm={6} md={4}>
            <TodoTile tileInfo={x} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TodoListScreen;
