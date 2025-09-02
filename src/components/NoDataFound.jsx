import Grid from "@mui/material/Grid";
const NoDataFound = () => {
  return (
    <>
      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        wrap="wrap"
      >
        No Data Found
      </Grid>
    </>
  );
};

export default NoDataFound;
