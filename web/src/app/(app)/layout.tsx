import AppHeader from "@/components/headers/appHeader";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-white flex flex-col transition-colors ease-in-out duration-300">
      <AppHeader />
      <main className="relative z-10 flex-1">
        {children}
      </main>
    </div>
  );
}