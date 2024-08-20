"use server";
import headers from "./Headers";

export default async function DeleteRequest(url: string) {
  const { API_URL, API_VER } = process.env;
  if (!API_URL || !API_VER) return;

  let res = null;
  try {
    console.log(API_URL + API_VER + url);
    res = await (
      await fetch(API_URL + API_VER + url, {
        method: "DELETE",
        ...headers(),
        credentials: "include",
      })
    ).json();
  } catch (error) {
    console.log(error);
  } finally {
    return res;
  }
}
