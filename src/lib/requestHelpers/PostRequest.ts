"use server";
import { cookies } from "next/headers";
import headers from "./Headers";

export default async function PostRequest(url: string, data: any) {
  const { API_URL, API_VER } = process.env;
  if (!API_URL || !API_VER) return;

  const res = await fetch(API_URL + API_VER + url, {
    method: "POST",
    ...headers(),
    body: JSON.stringify(data),
  });

  const resJson = await res.json();
  return resJson;
}

export async function Login(data: any) {
  const cookieStore = cookies();
  const { API_URL, API_VER } = process.env;
  if (!API_URL || !API_VER) return;
  const res = await fetch(API_URL + API_VER + "/auth/login", {
    method: "POST",
    ...headers(),
    body: JSON.stringify(data),
  });

  const resJson = await res.json();
  if (resJson?.token) {
    const expire = (Number(process.env.JWT_EXPIRE) || 3) * 24 * 60 * 60;
    cookieStore.set("Authentication", resJson.token, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      maxAge: expire,
    });
  }
  return resJson;
}
