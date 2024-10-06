import { useState } from "react";
import Header from "./Header";
import Nav from "./Nav";

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="bg-bgGray min-h-screen" >
      <Header />
      <div className="flex">
        <Nav show={showNav} />
        <div className="flex-grow p-4">
          {children}
        </div>
      </div>
    </div>
  );
}