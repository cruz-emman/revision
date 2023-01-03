import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import AddProduct from "./pages/AddProduct";
import Cart from "./pages/Cart";
import CategoryPage from "./pages/CategoryPage";
import EditProduct from "./pages/EditProduct";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyProductsList from "./pages/MyProductsList";
import ProductView from "./pages/ProductView";
import Register from "./pages/Register";
import SearchProduct from "./pages/SearchProduct";
import Statistics from "./pages/Statistics";
import {ToastContainer } from 'react-toastify'
import Anonymous from './components/Anonymous'
import 'react-toastify/dist/ReactToastify.css'
import Protected from "./components/Protected";
import EditProfile from "./pages/EditProfile";
import SpentDashboard from "./pages/SpentDashboard";
import SellerPage from "./pages/SellerPage";


function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" exact element={<Home />} /> 

        {/* Product  */}

        <Route element={<Protected />}>
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/editproduct/:id" element={<EditProduct />} />
          
                  {/* Info seller */}
          <Route path="/myproducts/:id" element={<MyProductsList />}  />
          <Route path="/statistics/:id" element={<Statistics />} />
          <Route path="/spentdashboard/:id" element={<SpentDashboard />} />
          <Route path="/sellerProfile/:id" element={<SellerPage />} />
                  {/*  Personal Information */}
            <Route path="/edituser/:id" element={<EditProfile />} />
        </Route>

        
        <Route path="/category/:category"  element={<CategoryPage />} />
        <Route path="/search/:search"  element={<SearchProduct />} />
        <Route path="/view/:id" element={<ProductView />} />
        <Route path="/cart" element={<Cart />} />


        


        {/* Login/Register */}
        <Route element={<Anonymous />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>


    </Routes>
    <ToastContainer />

  </BrowserRouter>
  );
}

export default App;
