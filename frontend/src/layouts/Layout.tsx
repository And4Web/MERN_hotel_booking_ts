import { ReactNode } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";

interface Props {
  children?: ReactNode;
}

function Layout({ children }: Props) {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {location.pathname === "/" && (
        <>
          <Hero />
          <div className="mx-auto px-2">
            <SearchBar />
          </div>
        </>
      )}

      <div className="container mx-auto py-10 flex-1">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
