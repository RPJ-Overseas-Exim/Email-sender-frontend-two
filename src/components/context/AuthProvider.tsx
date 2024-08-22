"use client";
import GetRequest from "@/lib/requestHellpers/GetRequest";
import { useRouter } from "next/navigation";
import { createContext, useState, useContext, useEffect } from "react";
import { type Dispatch } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type Auth =
  | {
      login: Boolean;
      role: string;
    }
  | undefined;
const AuthContext = createContext<
  undefined | { auth: Auth; setAuth: Dispatch<any>; isFetching: boolean }
>(undefined);

export const AuthProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const router = useRouter();
  // const [auth, setAuth] = useState<Auth>();

  const fetchRole = async () => {
    return await GetRequest("/auth/role");
  };

  const qc = useQueryClient();
  const query = useQuery({ queryKey: ["authContext"], queryFn: fetchRole });
  const { mutate } = useMutation({
    onMutate: (variables) => {
      qc.setQueryData(["authContext"], () => variables);
    },
  });

  // useEffect(() => {
  // if (!query?.data?.role) {
  //   mutate(undefined);
  //   router.push("/");
  // }
  // }, [query?.data]);
  return (
    <AuthContext.Provider
      value={{
        auth: query.data,
        setAuth: mutate,
        isFetching: query.isFetching,
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
