import Header from "@/components/Headers";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-white flex flex-col transition-colors ease-in-out duration-300">
      <Header />
      <main className=" relative z-10 flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
