import { Routes, Route } from "react-router-dom";
import {
  SignIn,
  SignUp,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";

import Navbar from "./components/layout/Navbar";
import Dashboard from "./pages/Dashboard";
import TripList from "./pages/TripList";
import TripDetail from "./pages/TripDetail";
import CustomizeTrip from "./pages/CustomizeTrip";
import Expenses from "./pages/Expenses";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="pt-[80px] px-4">
        {" "}
        {/* Push content below navbar */}
        <Routes>
          {/* Public Auth Routes */}
          <Route
            path="/sign-in/*"
            element={<SignIn routing="path" path="/sign-in" />}
          />
          <Route
            path="/sign-up/*"
            element={<SignUp routing="path" path="/sign-up" />}
          />

          {/* Public Route */}
          <Route path="/" element={<Dashboard />} />

          {/* Protected Routes */}
          <Route
            path="/trips"
            element={
              <ProtectedRoute>
                <TripList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trip/:id"
            element={
              <ProtectedRoute>
                <TripDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customize"
            element={
              <ProtectedRoute>
                <CustomizeTrip />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expenses"
            element={
              <ProtectedRoute>
                <Expenses />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
