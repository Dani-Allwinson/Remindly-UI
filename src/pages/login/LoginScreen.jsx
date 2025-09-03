import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Box, FormControl, FormLabel } from "@mui/material";
import ApiServices from "../../services/ApiServices";
import { useSnackBar } from "../../context/SnackbarContext";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const { showSnackBar } = useSnackBar();

  const [validate, setValidate] = useState({
    isUserNameEntered: false,
    isPasswordEntered: false,
  });
  function navigateToRegister() {
    navigate("/register");
  }

  function onLogin(e) {
    e.preventDefault();
    if (login.username == "") {
      setValidate((prev) => ({
        ...prev,
        isUserNameEntered: true,
      }));
    } else {
      setValidate((prev) => ({
        ...prev,
        isUserNameEntered: false,
      }));
    }
    if (login.password == "") {
      setValidate((prev) => ({
        ...prev,
        isPasswordEntered: true,
      }));
    } else {
      setValidate((prev) => ({
        ...prev,
        isPasswordEntered: false,
      }));
    }

    if (login.username !== "" && login.password !== "") {
      var res = ApiServices.post("/Auth/login", {
        Name: login.username,
        Password: login.password,
      });
      res
        .then(() => {
          navigate("/dashboard");
        })
        .catch((e) => {
          console.log("error");
          showSnackBar(e.response.data);
        });
    }
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
          Welcome back
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
          <FormControl>
            <FormLabel sx={{ color: "#000" }}>Username</FormLabel>
            <TextField
              id="user-name"
              fullWidth
              error={validate.isUserNameEntered}
              placeholder="Enter your Name"
              helperText={
                validate.isUserNameEntered ? "Please enter the username" : ""
              }
              value={login.username}
              onChange={(e) => {
                e.preventDefault();
                setLogin((value) => ({
                  ...value,
                  username: e.target.value,
                }));
              }}
            />
            <Box sx={{ padding: 2 }}></Box>
            <FormLabel sx={{ color: "#000" }}>Password</FormLabel>
            <TextField
              id="password"
              placeholder="Enter your Password"
              fullWidth
              error={validate.isPasswordEntered}
              helperText={
                validate.isPasswordEntered ? "Please enter the password" : ""
              }
              value={login.password}
              type="password"
              onChange={(e) => {
                setLogin((value) => ({
                  ...value,
                  password: e.target.value,
                }));
              }}
            />
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            onClick={(e) => onLogin(e)}
          >
            Login
          </Button>

          <Typography
            variant="subtitle2"
            color="#61758A"
            sx={{
              textAlign: "center",
            }}
          >
            Don't have an account?{" "}
            <Typography
              variant="body1"
              color="primary"
              sx={{
                display: "inline",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={navigateToRegister}
            >
              Register
            </Typography>
          </Typography>
        </Container>
      </Container>
    </>
  );
};

export default LoginScreen;
