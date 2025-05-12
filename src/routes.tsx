import { createBrowserRouter } from "react-router";
import Login from "./pages/login";
import TasksPage from "./pages/tasks";
import ThoughtsPage from "./pages/thought";

const user = localStorage.getItem("user");

export const router = createBrowserRouter([
  {
    path: "/",
    element: user ? <TasksPage /> : <Login />,
  },
  {
    path: "/thought",
    element: <ThoughtsPage />
  }
]);
