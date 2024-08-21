import { AuthProvider } from "@/components/context/AuthProvider";
import CustomThemeProvider from "@/components/context/CustomThemeProvider";
import ReactQueryProvider from "@/components/context/ReactQueryProvider";

export default function Providers({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <CustomThemeProvider>{children}</CustomThemeProvider>
      </AuthProvider>
    </ReactQueryProvider>
  );
}
