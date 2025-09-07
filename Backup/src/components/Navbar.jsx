export default function Navbar() {
  return (
    <header className="bg-white shadow-md h-16 flex items-center justify-between px-6">
      <h1 className="text-xl font-bold text-gray-700">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Alexander Pierce</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="user"
          className="rounded-full w-10 h-10 border-2 border-gray-200"
        />
      </div>
    </header>
  );
}
