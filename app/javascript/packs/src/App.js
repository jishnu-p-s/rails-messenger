import React from "react";
import { useRoutes, navigate } from "hookrouter";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "semantic-ui-css/semantic.min.css";
import Navbar from "./components/Navbar";
import "./styles.css";
import useLogin from "./helpers/useLogin";
import { AuthContext } from "./helpers/useAuthContext";
import Users from "./pages/Users";

const publicroutes = {
  "/": () => <Login />,
  "/signup": () => <Signup />,
  "/login": () => <Login />,
};
const authRoutes = {
  "/": () => <Home />,
  "/users": () => <Users />,
};
const App = () => {
  const publicRoutes = useRoutes(publicroutes);
  const auth = useRoutes(authRoutes);
  const { user, loading } = useLogin();

  const Notfound = () => (
    <div style={{ width: "100%", textAlign: "center", marginTop: "20%" }}>
      Error 404: Page not found
    </div>
  );
  return (
    <AuthContext.Provider value={{ user }}>
      <Navbar />
      {loading ? (
        <div style={{ width: "100%", textAlign: "center", marginTop: "20%" }}>
          Loading
        </div>
      ) : (
        <div className="ui container">
          {!user ? publicRoutes ?? <Notfound /> : auth ?? <Notfound />}
        </div>
      )}
    </AuthContext.Provider>
  );
};

export default App;
