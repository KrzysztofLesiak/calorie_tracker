import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { Navigation } from "./components/Navigation";
import { Home } from "./components/Home";
import { UserProvider } from "./context/UserContext";
import { LoginPage } from "./components/LoginPage";
import { ProductsBase } from "./components/ProductsBase";
import { NewProduct } from "./components/NewProduct";
import { ProductProvider } from "./context/ProductContext";
import { Tracker } from "./components/Tracker";
import { AuthWrapper } from "./components/AuthWrapper";
import { TrackerProvider } from "./context/TrackerContext";

function App() {
  return (
    <UserProvider>
      <ProductProvider>
        <TrackerProvider>
          <div className="App">
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<LoginPage />} />
              <Route path="/products" element={<ProductsBase />} />
              <Route path="/products/:productId" element={<ProductsBase />} />
              <Route path="/products/new" element={<NewProduct />} />
              <Route element={<AuthWrapper />}>
                <>
                  <>
                    <Route path="/app" element={<Tracker />} />
                    <Route path="/app/:productId" element={<Tracker />} />
                  </>
                </>
              </Route>
            </Routes>
          </div>
        </TrackerProvider>
      </ProductProvider>
    </UserProvider>
  );
}

export default App;
