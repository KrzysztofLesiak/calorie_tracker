import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { Navigation } from "./components/Navigation";
import { UserProvider } from "./context/UserContext";
import { ProductProvider } from "./context/ProductContext";
import { TrackerProvider } from "./context/TrackerContext";
import { Home } from "./pages/Home/Home";
import { LoginPage } from "./pages/Login/LoginPage";
import { ProductsBase } from "./pages/Products/ProductsBase";
import { NewProduct } from "./pages/Products/NewProduct";
import { AuthWrapper } from "./pages/Login/AuthWrapper";
import { Tracker } from "./pages/App/Tracker";

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
