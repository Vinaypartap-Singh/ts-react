import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // backend servers

export const useThoughtSocket = (handlers: {
  onCreated?: (data: any) => void;
  onUpdated?: (data: any) => void;
  onDeleted?: (data: any) => void;
}) => {
  useEffect(() => {
    if (handlers.onCreated) {
      socket.on("thought_created", handlers.onCreated);
    }
    if (handlers.onUpdated) {
      socket.on("thought_updated", handlers.onUpdated);
    }
    if (handlers.onDeleted) {
      socket.on("thought_deleted", handlers.onDeleted);
    }

    return () => {
      socket.off("thought_created", handlers.onCreated);
      socket.off("thought_updated", handlers.onUpdated);
      socket.off("thought_deleted", handlers.onDeleted);
    };
  }, []);
};
