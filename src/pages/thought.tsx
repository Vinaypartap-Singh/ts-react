import { useThoughtSocket } from "@/hooks/useThoughtSocket";
import { useEffect, useState } from "react";

const ThoughtsPage = () => {
  const [thoughts, setThoughts] = useState<any>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/thoughts/list")
      .then((res) => res.json())
      .then((data) => setThoughts(data.data));
  }, []);

  useThoughtSocket({
    onCreated: (newThought) => {
      setThoughts((prev: any) => [newThought, ...prev]);
    },
    onUpdated: (updatedThought) => {
      setThoughts((prev: any) =>
        prev.map((t: any) => (t.id === updatedThought.id ? updatedThought : t))
      );
    },
    onDeleted: (deletedThought) => {
      setThoughts((prev: any) =>
        prev.filter((t: any) => t.id !== deletedThought.id)
      );
    },
  });

  return (
    <div>
      <h2>Thoughts</h2>
      {thoughts.map((thought: any) => (
        <div key={thought.id}>
          <h4>{thought.title}</h4>
          <p>{thought.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ThoughtsPage;
