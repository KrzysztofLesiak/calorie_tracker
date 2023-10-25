import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { Navigation } from "./components/Navigation";
import { Home } from "./components/Home";
import { UserProvider } from "./context/UserContext";
import { LoginPage } from "./components/LoginPage";

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<LoginPage />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
