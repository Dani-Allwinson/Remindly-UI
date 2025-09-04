import "./App.css";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import LoginScreen from "./pages/login/LoginScreen";
import RegisterScreen from "./pages/register/RegisterScreen";
import HomeScreen from "./pages/home/HomeScreen";
import { SnackBarProvider } from "./context/SnackbarContext";
import MainLayout from "./layout/MainLayout";
import CategoryScreen from "./pages/category/CategoryScreen";
import CalendarScreen from "./pages/calendar/CalendarScreen";
import TodoAddScreen from "./pages/todo_add/TodoAddScreen";
import SpinnerContextProvider from "./context/SpinnerLoadingContext";
import TodoViewScreen from "./pages/todo_view/TodoViewScreen";
function App() {
  return (
    <SpinnerContextProvider>
      <SnackBarProvider>
        <BrowserRouter>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/dashboard" element={<HomeScreen />} />
              <Route path="/category" element={<CategoryScreen />}></Route>
              <Route path="/calendar" element={<CalendarScreen />}></Route>
              <Route path="/add" element={<TodoAddScreen />}></Route>
              <Route path="/view/:id" element={<TodoViewScreen />}></Route>
              <Route path="/edit/:id" element={<TodoAddScreen />}></Route>
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </SnackBarProvider>
    </SpinnerContextProvider>
  );
}

export default App;
