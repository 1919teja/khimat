export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-primary text-2xl font-bold">ShipCompare</span>
            <span className="ml-2 text-xs bg-[#FF5A5F] text-white px-2 py-0.5 rounded-md">BETA</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-primary">Home</a>
            <a href="#" className="text-gray-600 hover:text-primary">How It Works</a>
            <a href="#" className="text-gray-600 hover:text-primary">Partners</a>
            <a href="#" className="text-gray-600 hover:text-primary">Contact</a>
          </nav>
          <button className="md:hidden text-gray-500 hover:text-gray-700">
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>
    </header>
  );
}
