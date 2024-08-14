import Sidebar from "./Sidebar";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-dvh">
      <Sidebar />
      <div className="lg:w-[80%]">{children}</div>
    </main>
  );
}
