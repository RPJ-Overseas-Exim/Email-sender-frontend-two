"use server";
import { cookies } from "next/headers";
type header = {
  headers: { [x: string]: string };
  credentials: RequestCredentials | undefined;
};

const headers = (
  customHeaders: { [x: string]: string } | undefined = undefined,
) => {
  const cookieStore = cookies();
  const jwtCookie = cookieStore.get("Authentication");
  const cookie = `${jwtCookie?.name}=${jwtCookie?.value}`;

  if (customHeaders)
    return {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: cookie,
        ...customHeaders,
      },
      credentials: "include",
    } satisfies header;

  return {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Cookie: cookie,
    },
    credentials: "include",
  } satisfies header;
};

export default headers;
