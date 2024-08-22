"use server";
import headers from "./Headers";

export default async function PutRequest(url: string, data: any) {
  const { API_URL, API_VER } = process.env;
  if (!API_URL || !API_VER) return;

  const res = await fetch(API_URL + API_VER + url, {
    method: "PUT",
    ...headers(),
    body: JSON.stringify(data),
  });

  const resJson = await res.json();
  return resJson;
}
