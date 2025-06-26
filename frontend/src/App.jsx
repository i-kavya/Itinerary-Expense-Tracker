import { Routes, Route } from "react-router-dom";
import {
  SignIn,
  SignUp,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import TripList from "./pages/TripList";
import TripDetail from "./pages/TripDetail";
import CustomizeTrip from "./pages/CustomizeTrip";
import Expenses from "./pages/Expenses";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Clerk Auth Routes */}
        <Route
          path="/sign-in/*"
          element={<SignIn routing="path" path="/sign-in" />}
        />
        <Route
          path="/sign-up/*"
          element={<SignUp routing="path" path="/sign-up" />}
        />
        <Route path="/customize" element={<CustomizeTrip />} />
        <Route path="/expenses" element={<Expenses />} />
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <>
              <SignedIn>
                <Dashboard />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/trip/:id"
          element={
            <>
              <SignedIn>
                <TripDetail />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/trips"
          element={
            <>
              <SignedIn>
                <TripList />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
