"use client";
import GetRequest from "@/lib/requestHellpers/GetRequest";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState, useContext } from "react";
import { type Dispatch } from "react";

type Auth = {
  login: Boolean;
  role: string;
};
const AuthContext = createContext<
  undefined | { auth: Auth; setAuth: Dispatch<any> }
>(undefined);

export const AuthProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const router = useRouter();
  const [auth, setAuth] = useState<Auth>({ login: false, role: "" });

  const fetchRole = async () => {
    const res = await GetRequest("/auth/login");
    if (res.role) {
      setAuth({ login: true, role: res.role });
    } else router.push("/");
  };
  useEffect(() => {
    fetchRole();
  }, [setAuth]);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const router = useRouter();
  const context = useContext(AuthContext);
  if (context === undefined) {
    router.push("/");
    throw new Error("Auth state was called outside of provider");
  }
  return context;
};

export default useAuth;
