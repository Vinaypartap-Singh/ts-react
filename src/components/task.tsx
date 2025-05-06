import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { ITask } from "@/types/task.interface";
import axios from "axios";
import type { JSX } from "react";
import { toast } from "sonner";

export default function Task(props: ITask): JSX.Element {
  const { id, title, description, dueDate, status, priority } = props;

  const updateStatus = async (id: string) => {
    try {
      await axios.put("http://localhost:3000/api/tasks/update", {
        taskId: id,
        status: "IN_PROGRESS",
      });
      location.reload();
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          toast("An Error Occured", {
            description: error.message,
          });
        } else {
          toast("unexpected", {
            description: "An Unexpected Error Occured.",
          });
        }
      }
    }
  };

  const markAsComplete = async (id: string) => {
    try {
      await axios.put("http://localhost:3000/api/tasks/update", {
        taskId: id,
        status: "COMPLETED",
      });
      location.reload();
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          toast("An Error Occured", {
            description: error.message,
          });
        } else {
          toast("unexpected", {
            description: "An Unexpected Error Occured.",
          });
        }
      }
    }
  };

  let formattedDate = dueDate.toLocaleDateString("en-GB", {
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
          {priority === "NORMAL" && (
            <Badge className="bg-sky-800 p-2" variant="outline">
              {priority.toUpperCase()}
            </Badge>
          )}
          {priority === "HIGH" && (
            <Badge className="bg-red-800 p-2" variant="outline">
              {priority.toUpperCase()}
            </Badge>
          )}
          {priority === "LOW" && (
            <Badge className="bg-green-800 p-2" variant="outline">
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
            checked={status === "IN_PROGRESS" ? true : false}
            onCheckedChange={() => console.log("Switch Changed")}
            onClick={() => updateStatus(id!)}
            id="in-progress"
          />
          <Label className="ml-4" htmlFor="in-progress">
            In Progress
          </Label>
        </div>
        <Button onClick={() => markAsComplete(id!)}>Mark as Completed</Button>
      </CardFooter>
    </Card>
  );
}
