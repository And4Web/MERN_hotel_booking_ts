import Header from "../components/Header"
import Hero from "../components/Hero"
import Footer from "../components/Footer"
import { useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

function Layout({children}: Props) {
  const location = useLocation();
  // console.log("location >>> ", location);
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      {location.pathname === "/" && <Hero/>}      
      <div className="container mx-auto py-10 flex-1">
        {children}
      </div>
      <Footer/>
    </div>
  )
}

export default Layout