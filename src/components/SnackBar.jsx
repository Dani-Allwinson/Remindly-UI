import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import { red } from "@mui/material/colors";
import { SnackbarContent } from "@mui/material";
const SnackBar = ({ open, setOpen, message }) => {
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <SnackbarContent
          sx={{ backgroundColor: red[800], color: "#fff" }}
          message={message}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setOpen(false)}
            >
              <CloseOutlinedIcon />
            </IconButton>
          }
        />
      </Snackbar>
    </>
  );
};

export default SnackBar;
