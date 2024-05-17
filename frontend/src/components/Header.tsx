import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignoutButton from "./SignoutButton";

function Header() {
  const { isLoggedin } = useAppContext();
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">A-Bookings</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedin ? (
            <>
              <Link to="/my-bookings" className="flex items-center px-3 font-bold hover:bg-blue-500 hover:text-blue-800 text-white rounded">My Bookings</Link>
              <Link to="/my-hotels" className="flex items-center px-3 font-bold hover:bg-blue-500 hover:text-blue-800 text-white rounded">My Hotels</Link>
              <SignoutButton/>
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100 rounded"
            >
              Sign in
            </Link>
          )}
        </span>
      </div>
    </div>
  );
}

export default Header;
