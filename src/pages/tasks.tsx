import Task from "@/components/task";
import TaskCounter from "@/components/taskCounter";
import TaskSidebar from "@/components/taskSidebar";
import { type JSX } from "react";

export default function TasksPage(): JSX.Element {
  return (
    <section className="flex flex-row w-full p-6 gap-8">
      <section className="flex basis-2/3 justify-center">
        <div className="flex flex-col w-4/5 p-4">
          <h1 className="text-white text-center font-bold text-2xl mb-10">
            Tasks as on: Tuesday, May 6 2025
          </h1>

          <div className="flex justify-around">
            <TaskCounter status="todo" count={10} />
            <TaskCounter status="inProgress" count={12} />
            <TaskCounter status="completed" count={10} />
          </div>
          <div className="mt-10 flex justify-center">
            <div className="w-full max-w-xl">
              <Task
                title="Task Title"
                description="Task Description"
                dueDate={new Date("2025-01-01T12:00:00.000Z")}
                priority="low"
                status="inProgress"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex basis-1/3">
        <TaskSidebar />
      </section>
    </section>
  );
}
