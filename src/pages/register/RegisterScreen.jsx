import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { InputLabel, Box } from "@mui/material";
import ApiServices from "../../services/ApiServices";
import { useSnackBar } from "../../context/SnackbarContext";

const RegisterScreen = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { showSnackBar } = useSnackBar();

  function navigateToLogin() {
    navigate("/login");
  }

  function onRegister() {
    var res = ApiServices.post("/Auth/register", {
      Name: register.username,
      Email: register.email,
      Password: register.password,
    });
    res
      .then(() => {
        navigateToLogin();
      })
      .catch((e) => {
        showSnackBar(e.response.data);
      });
  }

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Typography
          variant="h4"
          color="initial"
          sx={{
            padding: 3,
            fontWeight: 600,
          }}
        >
          Create your Account
        </Typography>
        <Container
          maxWidth="xs"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            backgroundColor: "#fff",
            padding: 5,
            borderRadius: 2,
          }}
        >
          <Box>
            <InputLabel sx={{ color: "#000" }}>Name</InputLabel>
            <TextField
              id="name"
              fullWidth
              placeholder="Enter your Name"
              value={register.username}
              onChange={(e) => {
                setRegister((value) => ({
                  ...value,
                  username: e.target.value,
                }));
              }}
            />
          </Box>

          <Box>
            <InputLabel sx={{ color: "#000" }}>Email</InputLabel>
            <TextField
              id="email"
              fullWidth
              placeholder="Enter your Email"
              value={register.username}
              onChange={(e) => {
                setRegister((value) => ({
                  ...value,
                  email: e.target.value,
                }));
              }}
            />
          </Box>

          <Box>
            <InputLabel sx={{ color: "#000" }}>Password</InputLabel>
            <TextField
              id="password"
              placeholder="Enter your Password"
              fullWidth
              value={register.password}
              onChange={(e) => {
                setRegister((value) => ({
                  ...value,
                  password: e.target.value,
                }));
              }}
            />
          </Box>

          <Button variant="contained" color="primary" onClick={onRegister}>
            register
          </Button>

          <Typography
            variant="subtitle2"
            color="#61758A"
            sx={{
              textAlign: "center",
            }}
          >
            Already have an account?{" "}
            <Typography
              variant="body1"
              color="primary"
              sx={{
                display: "inline",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={navigateToLogin}
            >
              Log in
            </Typography>
          </Typography>
        </Container>
      </Container>
    </>
  );
};

export default RegisterScreen;
