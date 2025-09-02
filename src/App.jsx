import "./App.css";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import LoginScreen from "./pages/login/LoginScreen";
import RegisterScreen from "./pages/register/RegisterScreen";
import HomeScreen from "./pages/home/HomeScreen";
import { SnackBarProvider } from "./context/SnackbarContent";
import MainLayout from "./layout/MainLayout";
import CategoryScreen from "./pages/category/CategoryScreen";
import CalendarScreen from "./pages/calendar/CalendarScreen";
import TodoAddScreen from "./pages/todo_add/TodoAddScreen";

function App() {
  return (
    <SnackBarProvider>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/category" element={<CategoryScreen />}></Route>
            <Route path="/calendar" element={<CalendarScreen />}></Route>
            <Route path="/add" element={<TodoAddScreen />}></Route>
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </SnackBarProvider>
  );
}

export default App;
