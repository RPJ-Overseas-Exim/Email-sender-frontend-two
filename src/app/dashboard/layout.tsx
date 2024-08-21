import Sidebar from "./Sidebar";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-dvh">
      <Sidebar />
      <div className="w-full lg:w-[75%]">{children}</div>
    </main>
  );
}
