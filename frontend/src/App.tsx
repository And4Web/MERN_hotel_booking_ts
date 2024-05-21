import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./contexts/AppContext";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";

function App() {
  const {isLoggedin} = useAppContext();
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              Home page
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              Search page
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        {isLoggedin && (
          <>
          <Route
            path="/add-hotel"
            element={
              <Layout>
                <AddHotel />
              </Layout>
            }
          />
          <Route
            path="/my-hotels"
            element={
              <Layout>
                <MyHotels />
              </Layout>
            }
          />
          <Route
            path="/edit-hotel/:hotelId"
            element={
              <Layout>
                <EditHotel />
              </Layout>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <Layout>
                My Bookings
              </Layout>
            }
          />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
