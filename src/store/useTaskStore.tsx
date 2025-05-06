import type { ITask } from "@/types/task.interface";
import axios from "axios";
import { create } from "zustand";

interface TaskStore {
  tasks: ITask[];
  fetchTasks: (username: string) => Promise<void>;
  createTask: (task: Omit<ITask, "id">) => Promise<void>;
  updateTaskStatus: (taskId: string, status: ITask["status"]) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],

  fetchTasks: async (username) => {
    const response = await axios.get(
      `http://localhost:3000/api/tasks/list/${username}`
    );

    set({ tasks: response.data.data });
  },

  createTask: async (taskData) => {
    const res = await axios.post(
      "http://localhost:3000/api/tasks/create",
      taskData
    );
    if (res.status === 200) {
      set({ tasks: [res.data, ...get().tasks] });
    }
  },

  updateTaskStatus: async (taskId: string, status: ITask["status"]) => {
    await axios.put("http://localhost:3000/api/tasks/update", {
      taskId,
      status,
    });
    const updatedTasks = get().tasks.map((task) =>
      task.id === taskId ? { ...task, status } : task
    );
    set({ tasks: updatedTasks });
  },
}));
