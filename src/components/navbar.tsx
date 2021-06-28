import * as React from "react";

const Navbar: React.FC = () => {
  return (
    <div
      className={
        "w-full bg-purple-500 fixed top-0 left-0 right-0 text-white shadow-md"
      }
    >
      <div className={"px-3 py-2 text-xl"}>Precily frontend</div>
    </div>
  );
};

export default Navbar;
