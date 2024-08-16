"use server";
import { cookies } from "next/headers";
import headers from "./Headers";
import { redirect } from "next/navigation";

export default async function GetRequest(url: string) {
  const { API_URL, API_VER } = process.env;
  if (!API_URL || !API_VER) return;

  const res = await (
    await fetch(API_URL + API_VER + url, {
      method: "GET",
      ...headers(),
      credentials: "include",
    })
  ).json();

  return res;
}

export async function Logout(): Promise<void> {
  const cookieStore = cookies();
  cookieStore.delete("Authentication");
  redirect("/");
}
