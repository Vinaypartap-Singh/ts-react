import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTaskStore } from "@/store/useTaskStore";
import type { ITask } from "@/types/task.interface";
import axios from "axios";
import type { JSX } from "react";
import { toast } from "sonner";

export default function Task(props: ITask): JSX.Element {
  const { id, title, description, dueDate, status, priority } = props;
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);

  const handleStatusChange = async (newStatus: "IN_PROGRESS" | "COMPLETED") => {
    if (!id) return;
    try {
      await updateTaskStatus(id, newStatus);
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        toast("An Error Occurred", {
          description: error.response?.data?.message || "Unexpected error",
        });
      }
    }
  };

  const formattedDate = new Date(dueDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Card className="w-full mb-8">
      <CardHeader className="flex flex-row justify-between">
        <CardTitle className="basis-2/3 leading-8">{title}</CardTitle>
        <div>
          <Badge className="mr-2 p-2" variant="outline">
            {formattedDate}
          </Badge>
          {priority && (
            <Badge
              className={`p-2 ${
                priority === "NORMAL"
                  ? "bg-sky-800"
                  : priority === "HIGH"
                  ? "bg-red-800"
                  : "bg-green-800"
              }`}
              variant="outline"
            >
              {priority.toUpperCase()}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex flex-row items-center">
          <Switch
            checked={status === "IN_PROGRESS"}
            onCheckedChange={() => handleStatusChange("IN_PROGRESS")}
            id={`switch-${id}`}
          />
          <Label className="ml-4" htmlFor={`switch-${id}`}>
            In Progress
          </Label>
        </div>
        <Button onClick={() => handleStatusChange("COMPLETED")}>
          Mark as Completed
        </Button>
      </CardFooter>
    </Card>
  );
}
