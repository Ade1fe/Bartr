import Link from "next/link";

export default function Footer() {
  return (
    <footer className='bottom-0 z-50 w-full bg-[#1F453D] text-neutral-300 py-8'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">Product</div>
            <div className="flex flex-col gap-2 text-sm">
              <Link href='/howItWorks' className="cursor-pointer hover:text-white">How it works</Link>
              <Link href='/marketplace' className="cursor-pointer hover:text-white">Marketplace</Link>
              <Link href='/community' className="cursor-pointer hover:text-white">Community</Link>
            </div>
          </div>
          <div>
            <div className="mb-4">Company</div>
            <div className="flex flex-col gap-2 text-sm">
              <div className="cursor-pointer hover:text-white">About</div>
              <div className="cursor-pointer hover:text-white">Blog</div>
              <div className="cursor-pointer hover:text-white">Careers</div>
            </div>
          </div>
          <div>
            <div className="mb-4">Support</div>
            <div className="flex flex-col gap-2 text-sm">
              <div className="cursor-pointer hover:text-white">Help Center</div>
              <Link href='/guidelines' className="cursor-pointer hover:text-white">Safety & Guidelines</Link>
              <div className="cursor-pointer hover:text-white">Contact</div>
            </div>
          </div>
          <div>
            <div className="mb-4">Legal</div>
            <div className="flex flex-col gap-2 text-sm">
              <div className="cursor-pointer hover:text-white">Privacy</div>
              <Link href='/terms' className="cursor-pointer hover:text-white">Terms</Link>
              <Link href='/guidelines' className="cursor-pointer hover:text-white">Guidelines</Link>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white text-center text-sm">
          © 2025 BarterHub. All rights reserved.
        </div>
      </div>
    </footer>
  )
}