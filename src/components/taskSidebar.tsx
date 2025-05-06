import { Card } from "@/components/ui/card";
import { type JSX } from "react";
import { CreateTaskForm } from "./createTaskForm";
import Logout from "./logout";
import styles from "./styles/style.module.css";
import UserProfile from "./userProfile";

export default function TaskSidebar(): JSX.Element {
  const username = localStorage.getItem("user");
  return (
    <section className={`fixed right-4 top-4 ${styles.sidebarHeight}`}>
      <Card className="flex flex-col w-full h-full p-6">
        <UserProfile firstName={username ? username : "Vinay"} />
        <CreateTaskForm />
        <Logout />
      </Card>
    </section>
  );
}
