import { AuthProvider } from "@/components/context/AuthProvider";
import CustomThemeProvider from "@/components/context/CustomThemeProvider";
import ReactQueryProvider from "@/components/context/ReactQueryProvider";

export default function Providers({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <AuthProvider>
      <ReactQueryProvider>
        <CustomThemeProvider>{children}</CustomThemeProvider>
      </ReactQueryProvider>
    </AuthProvider>
  );
}
