import { UserButton, useUser } from "@clerk/clerk-react";

const Header = () => {
  const { user } = useUser();

  return (
    <div className="mb-8">
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md rounded-lg">
        {/* Brand Name */}
        <h1 className="text-2xl font-bold text-gray-800">CHEFZIA</h1>

        {/* User Profile */}
        <div className="flex items-center space-x-4">
          <p className="hidden md:block text-gray-600">Welcome, {user.fullName}</p>
          <UserButton />
        </div>
      </header>
    </div>
  );
};

export default Header;
