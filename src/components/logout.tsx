import type { JSX } from "react";
import { Button } from "./ui/button";

export default function Logout(): JSX.Element {
  const logOut = () => {
    localStorage.removeItem("user");
    location.reload();
  };

  return (
    <Button variant={"outline"} className="cursor-pointer" onClick={logOut}>
      LogOut
    </Button>
  );
}
