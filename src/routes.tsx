import { createBrowserRouter } from "react-router";
import TasksPage from "./pages/tasks";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <TasksPage />
    }
])