import AuthHeader from "../../components/headers/authHeader";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-white flex flex-col transition-colors ease-in-out duration-300">
      <AuthHeader />
      <main className="relative p-0 lg:p-4 flex-1 items-start justify-center flex mt-10">
        <div className="w-full max-w-xl p-2 lg:p-4 flex items-center justify-center">
          {children}
        </div>
      </main>
    </div>
  );
}
