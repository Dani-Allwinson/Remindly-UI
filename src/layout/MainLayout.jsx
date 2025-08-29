import NavBar from "../components/NavBar";
import SnackBar from "../components/SnackBar";

const MainLayout = ({ children, open, setOpen, errorMessage }) => {
  return (
    <>
      <NavBar />
      {children}
      <SnackBar open={open} setOpen={setOpen} message={errorMessage} />
    </>
  );
};

export default MainLayout;
