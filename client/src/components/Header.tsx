
import { Link } from "wouter";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/">
              <a className="text-primary text-2xl font-bold">ShipCompare</a>
            </Link>
            <span className="ml-2 text-xs bg-[#FF5A5F] text-white px-2 py-0.5 rounded-md">BETA</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link href="/">
              <a className="text-gray-600 hover:text-primary">Home</a>
            </Link>
            <Link href="/how-it-works">
              <a className="text-gray-600 hover:text-primary">How It Works</a>
            </Link>
            <Link href="/partners">
              <a className="text-gray-600 hover:text-primary">Partners</a>
            </Link>
            <Link href="/contact">
              <a className="text-gray-600 hover:text-primary">Contact</a>
            </Link>
          </nav>
          <button className="md:hidden text-gray-500 hover:text-gray-700">
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>
    </header>
  );
}
