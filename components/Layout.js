import { useState, useEffect } from "react";
import Header from "./Header";
import Nav from "./Nav";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize(); // Set initial sidebar state
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <div className="bg-bgGray" >
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex">
        <Nav sidebarOpen={sidebarOpen} />
        <div className="flex-grow p-4 mt-8 w-full">
          {children}
        </div>
      </div>
    </div>
  );
}