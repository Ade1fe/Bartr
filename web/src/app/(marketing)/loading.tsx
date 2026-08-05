import Loader from "@/components/loader";

export default function MarketingLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader type="bars" color="#A5B6B1" height={30} width={30} />
    </div>
  );
}