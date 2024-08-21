"use client";
import GetRequest from "@/lib/requestHellpers/GetRequest";
import { useRouter } from "next/navigation";
import { createContext, useState, useContext, useEffect } from "react";
import { type Dispatch } from "react";
import { useQuery } from "@tanstack/react-query";

type Auth =
  | {
      login: Boolean;
      role: string;
    }
  | undefined;
const AuthContext = createContext<
  undefined | { auth: Auth; setAuth: Dispatch<any> }
>(undefined);

export const AuthProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const router = useRouter();
  const [auth, setAuth] = useState<Auth>();

  const fetchRole = async () => {
    return await GetRequest("/auth/role");
  };

  const query = useQuery({ queryKey: ["authContext"], queryFn: fetchRole });

  useEffect(() => {
    if (query?.data?.role) {
      setAuth({ login: true, role: query.data.role });
    } else {
      setAuth({ login: false, role: "" });
      router.push("/");
    }
  }, [query?.data]);
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
