import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { type JSX } from "react";

export default function UserProfile(props: { firstName: String }): JSX.Element {
  const { firstName = "John" } = props;

  return (
    <div className="flex flex-col w-full py-8 items-center">
      <Avatar className={`mb-4 ${cn("h-24", "w-24")}`}>
        <AvatarFallback
          className={`text-2xl font-semibold ${cn(
            "bg-violet-600",
            "dark:bg-violet-600"
          )}`}
        >
          {firstName.slice(0, 1)}
        </AvatarFallback>
      </Avatar>
      <h4>Hello, {firstName}</h4>
    </div>
  );
}
