import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import axios from "axios";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const CreateTaskForm = () => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [description, setDescription] = useState("");

  const username = localStorage.getItem("user");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const taskData = {
      username: username?.toString(),
      title,
      status,
      priority,
      dueDate: date,
      description,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/tasks/create",
        taskData
      );
      if (response.status === 200) {
        toast("Task Added");
      }
      location.reload();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          toast("An Error Occured", {
            description: error.response.data?.message,
          });
        } else {
          toast("An unexpected Error Occured");
        }
      }
      console.error("Error creating task:", error);
    }

    console.log("Submitted task:", taskData);
  };

  return (
    <div>
      <h2 className="text-xl mb-4 font-semibold text-center">
        Create a new task
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="py-2">
          <Input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-row justify-between py-2">
          <div className="w-full mr-2">
            <Select onValueChange={setStatus} value={status}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="TODO">Todo</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full ml-2">
            <Select onValueChange={setPriority} value={priority}>
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="LOW">Low</SelectItem>
                  <SelectItem value="NORMAL">Normal</SelectItem>
                  <SelectItem value="HIGH">High</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="py-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(day) => setDate(day)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="py-2">
          <Textarea
            placeholder="Task Description"
            className="w-full max-w-[350px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="py-2 flex justify-end">
          <Button type="submit" className="w-full">
            Create Task
          </Button>
        </div>
      </form>
    </div>
  );
};
