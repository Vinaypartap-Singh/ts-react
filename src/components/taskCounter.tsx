import type { ITaskCounter } from "@/types/taskCounter.interface";
import type { JSX } from "react";

export default function TaskCounter({
  count,
  status,
}: ITaskCounter): JSX.Element {
  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className={`p-6 border-solid border-4 rounded-full mb-4 ${
          status === "todo" && "border-red-500"
        } ${status === "inProgress" && "border-orange-500"} ${
          status === "completed" && "border-green-500"
        }`}
      >
        <div className="min-w-10 min-h-10 text-center justify-center text-white text-2xl leading-10">
          {count}
        </div>
      </div>
      <div className="text-white text-center">
        {status === "todo" && "Todo"}
        {status === "inProgress" && "In-Progress"}
        {status === "completed" && "Completed"}
      </div>
    </div>
  );
}
