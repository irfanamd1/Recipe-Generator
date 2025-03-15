import { UserButton, useUser } from "@clerk/clerk-react";

const Header = () => {
  const { user } = useUser();
  
  return (
    <div className="mb-[30px]">
      <header className="header">
        <div className="brand-container">
          <h1 className="text-3xl">CHEFZIA</h1>
        </div>
        <div className="profile">
          <p className="hidden md:block">Welcome {user.fullName}</p>
          <UserButton
          />
        </div>
      </header>
    </div>
  );
};

export default Header;
