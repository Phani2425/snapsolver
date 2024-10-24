import { Route, Routes } from "react-router-dom";
import Home from "./screens/home";
import LandingPage from "./screens/home/LandingPage";
import { useAuth0 } from "@auth0/auth0-react";
import { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  if (isAuthenticated) {
    return children;
  } else {
    // If not authenticated, trigger Auth0 login
    loginWithRedirect();
    return null; // Prevent further rendering until logged in
  }
};

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route
          path="/canvas"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="*" element={<LandingPage />}></Route>
      </Routes>
    </div>
  );
};

export default App;
