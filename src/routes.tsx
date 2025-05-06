import { createBrowserRouter } from "react-router";
import Login from "./pages/login";
import TasksPage from "./pages/tasks";

const user = localStorage.getItem("user");

export const router = createBrowserRouter([
  {
    path: "/",
    element: user ? <TasksPage /> : <Login />,
  },
]);
