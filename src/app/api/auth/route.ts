import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();
  const { API_URL, API_VER } = process.env;
  if (!API_URL || !API_VER) return;

  const jwtCookie = cookieStore.get("Authentication");
  if (jwtCookie) {
    console.log(jwtCookie.value);
    cookieStore.set(jwtCookie.name, jwtCookie.value);
  }

  const res = await (
    await fetch(API_URL + API_VER + "/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${jwtCookie?.name}=${jwtCookie?.value}`,
        Accept: "application/json",
      },
      credentials: "include",
    })
  ).json();

  return new NextResponse(JSON.stringify(res));
}
