"use client";
import GetRequest from "@/lib/requestHellpers/GetRequest";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { type Dispatch } from "react";
import { useQuery } from "@tanstack/react-query";

type Auth =
  | {
      login: Boolean;
      role: string;
    }
  | undefined;
const AuthContext = createContext<
  undefined | { auth: Auth; setAuth: Dispatch<any>; isPending: boolean }
>(undefined);

export const AuthProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [auth, setAuth] = useState<Auth>({ login: false, role: "" });
  const fetchRole = async () => {
    const res = await GetRequest("/auth/role");
    if (res?.role) {
      return { login: true, role: res.role };
    }
    return { login: false, role: "" };
  };

  const query = useQuery({
    queryKey: ["authContext"],
    queryFn: fetchRole,
    staleTime: 0,
  });

  useEffect(() => {
    if (auth !== query.data) setAuth(query.data);
  }, [query?.data]);
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        isPending: query.isPending,
      }}
    >
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
