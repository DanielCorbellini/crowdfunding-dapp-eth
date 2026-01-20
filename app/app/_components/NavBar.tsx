import Link from "next/link";

export default function NavBar() {
  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
      <div className="h-full px-3 py-4 overflow-y-auto bg-neutral-primary-soft flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            FutureCrowd
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-colors font-medium"
          >
            <span>Home</span>
          </Link>

          {/* <Link
            href="/campaigns"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-colors font-medium"
          >
            <span>Campaigns</span>
          </Link> */}

          {/* <Link
            href="/requests"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-colors font-medium"
          >
            <span>Requests</span>
          </Link> */}
        </nav>
        <div className="p-4">
          <Link
            href="/campaigns/create"
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-4 rounded-xl hover:opacity-80 transition-opacity"
          >
            <span>+ New Campaign</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
