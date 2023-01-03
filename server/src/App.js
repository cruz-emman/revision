import Home from "./pages/home/Home";
import Login from "./pages/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { orderColumn, productColumn, userColumns } from "./datatablesource";
import {ToastContainer } from 'react-toastify'
import ListOrder from "./pages/ListOrder/ListOrder";
import ListProducts from "./pages/ListProducts/ListProducts";
import 'react-toastify/dist/ReactToastify.css'
import Protected from './Protected'
import Anonymous from "./pages/Anonymous";
import { useSelector } from "react-redux";
import Department from "./pages/dept/Department";
import Category from "./pages/cat/Category";


function App() {
  const admin = useSelector((state) => state.user.currentUser?.isAdmin);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>

        <Route element={<Anonymous />}>
          <Route path="/login" exact element={<Login />} />
        </Route>

          
          <Route element={<Protected />}>
            <Route path="/">
                <Route index element={<Home />} />
                <Route path="users">
                  <Route index element={<List columns={userColumns} />} />
                  <Route path=":userId" element={<Single />} />
                  <Route
                    path="edit/:userId"
                    element={<New inputs={userInputs} title="Edit User" />}
                  />
                </Route>

                <Route path="products">
                  <Route index element={<ListProducts  columns={productColumn} />} />
                  <Route path=":productId" element={<Single />} />
                  <Route
                    path="new"
                    element={<New inputs={productInputs} title="Edit Product" />}
                  />
                </Route>
                
                <Route path="order">
                  <Route index element={<ListOrder  columns={orderColumn} />} />
                  <Route path=":productId" element={<Single />} />
                  <Route
                    path="edit"
                    element={<New inputs={productInputs} title="Edit order" />}
                  />
                </Route>

                <Route path="department">
                  <Route index element={<Department />} />
                </Route>
                <Route path="category">
                  <Route index element={<Category />} />
                </Route>

            </Route>
          </Route>

        </Routes>
        <ToastContainer />

      </BrowserRouter>
    </div>
  );
}

export default App;
