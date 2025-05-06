import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState, type JSX } from "react";
import { toast } from "sonner";

export default function AccessForm(): JSX.Element {
  const [username, setUsername] = useState<string>("");
  const [accessCode, setAccessCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      username,
      accessCode,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/new",
        payload
      );

      if (response.status === 200) {
        toast("Login Success", {
          description: `Welcome ${response.data.data.username}`,
        });
        localStorage.setItem("user", response.data.data.username);
        location.reload();
        setLoading(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          toast("An Error Occured", {
            description: error.response.data?.message,
          });
          setLoading(false);
        } else {
          console.error("Unexpected error:", error);
          setLoading(false);
        }
      }
    }
  };

  return (
    <div className="max-h-screen h-full w-full flex justify-center items-center">
      <div className="p-10 max-w-xl flex flex-col items-center justify-center rounded-md my-20">
        <div className="mb-6 leading">
          <h1 className="font-bold text-2xl">Fill details to continue</h1>
          <p className="text-slate-400">
            Enter correct information to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="py-2">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="py-2">
            <Input
              type="password"
              placeholder="Access Code"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
            />
          </div>

          <div className="py-2">
            <Button type="submit" className="w-full">
              {loading ? <Loading /> : "Continue"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
