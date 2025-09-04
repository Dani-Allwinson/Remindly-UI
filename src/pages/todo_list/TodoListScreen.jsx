import { Container, Grid, Box, Typography } from "@mui/material";
import TodoTile from "../../components/TodoTile";
import { useNavigate } from "react-router-dom";

const TodoListScreen = ({ data }) => {
  const navigate = useNavigate();

  function navigateToEdit(id) {
    navigate(`/view/${id}`);
  }

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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 600,
              }}
              color="initial"
            >
              No Tasks yet!!
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                color: "grey",
              }}
              color="initial"
            >
              Time to add your first task and orangized
            </Typography>
          </Box>
        </Grid>
      </Grid>
    );
  }
  return (
    <Container sx={{ my: 3 }}>
      <Grid container spacing={3}>
        {data.map((x) => (
          <Grid item key={x.Id} xs={12} sm={6} md={4}>
            <TodoTile tileInfo={x} onClick={() => navigateToEdit(x.Id)} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TodoListScreen;
