import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { Navigation } from "./components/Navigation";
import { Home } from "./components/Home";
import { UserProvider } from "./context/UserContext";
import { LoginPage } from "./components/LoginPage";
import { ProductsBase } from "./components/ProductsBase";
import { NewProduct } from "./components/NewProduct";
import { ProductProvider } from "./context/ProductContext";

function App() {
  return (
    <UserProvider>
      <ProductProvider>
        <div className="App">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<LoginPage />} />
            <Route path="/products" element={<ProductsBase />} />
            <Route path="/products/:productId" element={<ProductsBase />} />
            <Route path="/products/new" element={<NewProduct />} />
          </Routes>
        </div>
      </ProductProvider>
    </UserProvider>
  );
}

export default App;
