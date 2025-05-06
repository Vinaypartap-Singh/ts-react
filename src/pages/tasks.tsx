import Loading from "@/components/loading";
import Task from "@/components/task";
import TaskCounter from "@/components/taskCounter";
import TaskSidebar from "@/components/taskSidebar";
import type { ITask } from "@/types/task.interface";
import axios from "axios";
import { useEffect, useState, type JSX } from "react";
import { toast } from "sonner";

export default function TasksPage(): JSX.Element {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const username = localStorage.getItem("user");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllTasks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/tasks/list/${username}`
        );
        console.log(response);
        setTasks(response.data.data);
        setLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 400) {
            toast("An Error Occured", {
              description: error.response.data?.message,
            });
            setLoading(false);
          } else {
            console.error("Unexpected error:", error);
            setLoading(false);
          }
        }
      }
    };

    getAllTasks();
  }, []);
  return (
    <section className="flex flex-row w-full p-6 gap-8">
      <section className="flex basis-2/3 justify-center">
        <div className="flex flex-col w-4/5 p-4">
          <h1 className="text-white text-center font-bold text-2xl mb-10">
            Tasks as on: Tuesday, May 6 2025
          </h1>

          <div className="flex justify-around">
            <TaskCounter status="TODO" count={10} />
            <TaskCounter status="IN_PROGRESS" count={12} />
            <TaskCounter status="COMPLETED" count={10} />
          </div>
          {loading ? (
            <div className="mt-10 flex justify-center items-center">
              <Loading />
            </div>
          ) : (
            <div className="mt-10 flex justify-center">
              {tasks.length !== 0 ? (
                <div className="w-full max-w-xl">
                  {tasks.map((task, index) => (
                    <Task
                      key={index}
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
