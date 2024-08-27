import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Input } from "./input";
import { ControllerRenderProps } from "react-hook-form";
import { useState } from "react";

export default function ShowHidePassword({
  field,
}: {
  field: ControllerRenderProps<
    {
      email: string;
      password: string;
    },
    "password"
  >;
}) {
  const [type, setType] = useState<"password" | "text">("password");
  return (
    <div className="relative">
      <Input placeholder="Your password" type={type} {...field} />
      <button
        type="button"
        className="absolute right-3 top-0 flex h-full items-center text-lg"
        onClick={() =>
          setType((type) => (type === "password" ? "text" : "password"))
        }
      >
        {type === "password" ? <FaEye /> : <FaEyeSlash />}
      </button>
    </div>
  );
}
