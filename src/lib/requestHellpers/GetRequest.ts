"use server";
import headers from "./Headers";

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
