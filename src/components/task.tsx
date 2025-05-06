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
import type { JSX } from "react";

export default function Task(props: ITask): JSX.Element {
  const { title, description, dueDate, status, priority } = props;

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
          {priority === "normal" && (
            <Badge className="bg-sky-800 p-2" variant="outline">
              {priority.toUpperCase()}
            </Badge>
          )}
          {priority === "high" && (
            <Badge className="bg-red-800 p-2" variant="outline">
              {priority.toUpperCase()}
            </Badge>
          )}
          {priority === "low" && (
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
            checked={status === "inProgress" ? true : false}
            onCheckedChange={() => console.log("Switch Changed")}
            id="in-progress"
          />
          <Label className="ml-4" htmlFor="in-progress">
            In Progress
          </Label>
        </div>
        <Button>Completed</Button>
      </CardFooter>
    </Card>
  );
}
