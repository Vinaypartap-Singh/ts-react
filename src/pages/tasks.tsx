import Loading from "@/components/loading";
import Task from "@/components/task";
import TaskCounter from "@/components/taskCounter";
import TaskSidebar from "@/components/taskSidebar";
import { useTaskStore } from "@/store/useTaskStore";
import axios from "axios";
import { useEffect, useState, type JSX } from "react";
import { toast } from "sonner";

export default function TasksPage(): JSX.Element {
  const username = localStorage.getItem("user");
  const [loading, setLoading] = useState(false);

  const tasks = useTaskStore((state) => state.tasks);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);

  useEffect(() => {
    const getTasks = async () => {
      if (!username) return;

      setLoading(true);
      try {
        await fetchTasks(username);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast("An error occurred", {
            description:
              error.response?.data?.message || "Something went wrong.",
          });
        } else {
          console.error("Unexpected error:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    getTasks();
  }, [username, fetchTasks]);

  return (
    <section className="flex flex-row w-full p-6 gap-8">
      <section className="flex basis-2/3 justify-center">
        <div className="flex flex-col w-4/5 p-4">
          <h1 className="text-white text-center font-bold text-2xl mb-10">
            Tasks as on: Tuesday, May 6 2025
          </h1>

          <div className="flex justify-around">
            <TaskCounter
              status="TODO"
              count={tasks.filter((t) => t.status === "TODO").length}
            />
            <TaskCounter
              status="IN_PROGRESS"
              count={tasks.filter((t) => t.status === "IN_PROGRESS").length}
            />
            <TaskCounter
              status="COMPLETED"
              count={tasks.filter((t) => t.status === "COMPLETED").length}
            />
          </div>

          {loading ? (
            <div className="mt-10 flex justify-center items-center">
              <Loading />
            </div>
          ) : (
            <div className="mt-10 flex justify-center">
              {tasks.length !== 0 ? (
                <div className="w-full max-w-xl">
                  {tasks.map((task) => (
                    <Task
                      key={task.id}
                      id={task.id}
                      title={task.title}
                      description={task.description}
                      dueDate={new Date(task.dueDate)}
                      priority={task.priority}
                      status={task.status}
                    />
                  ))}
                </div>
              ) : (
                <div>
                  <h3 className="font-semibold text-center text-muted-foreground">
                    🎉 You're all caught up! No pending tasks for now.
                  </h3>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="flex basis-1/3">
        <TaskSidebar />
      </section>
    </section>
  );
}
