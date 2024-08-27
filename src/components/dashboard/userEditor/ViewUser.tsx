import { User } from "@/lib/types/UserEditor";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LuCopy } from "react-icons/lu";

export default function ViewUser({ user }: { user: User }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="w-full p-2 text-left text-sm hover:bg-muted"
        >
          <span>View User</span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{user.username}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-start gap-2">
          <div className="flex w-full flex-col items-center justify-between gap-2 md:flex-row">
            <div className="w-full md:w-[70%]">
              <label
                htmlFor="email"
                className="text-xs font-bold text-muted-foreground"
              >
                Email
              </label>
              <p id="email" className="flex items-center gap-2">
                {user.email}&nbsp;
                <button
                  title="copy email"
                  onClick={(e) => navigator.clipboard.writeText(user.email)}
                  className="inline-block rounded-sm border border-foreground p-1 text-base text-foreground"
                >
                  <LuCopy />
                </button>
              </p>
            </div>

            <div className="w-full md:w-[20%]">
              <label
                htmlFor="password"
                className="text-xs font-bold text-muted-foreground"
              >
                Password
              </label>
              <p id="password" className="flex items-center gap-2">
                {user.password}
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col items-center justify-between gap-2 md:flex-row">
            <div className="w-full md:w-[70%]">
              <label
                htmlFor="role"
                className="text-xs font-bold text-muted-foreground"
              >
                Role
              </label>
              <p id="role" className="flex items-center gap-2">
                {user.role}&nbsp;
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
