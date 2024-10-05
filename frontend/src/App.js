import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './components/Home';
import Category from './components/category/Category.js';
import Products from './components/Products';
import NewProduct from './components/NewProduct';
import EditProduct from './components/EditProduct';
import State from './components/State';
import "bootstrap/dist/css/bootstrap.min.css"
import { AppContext, useAppState } from './app/app';
import { AppCategoryContext, useAppCategoryState } from './app/appCategory.js';
import "./app.css";
import NewCategory from './components/category/NewCategory.js';
import Footer from './components/Footer.js';

function App() {
  const [currentRoute, setCurrentRoute] = useState();
  useEffect(() => {
    const path = window.location.pathname;
    console.log(path);
    setCurrentRoute(path.slice(1, path.length));
  }, [])
  return (
    <AppCategoryContext.Provider value={useAppCategoryState()}>
    <AppContext.Provider value={useAppState()}>
      <BrowserRouter>

        <nav className='nav'>
          <ul className='nav-pills'>
            <li>
              <h3 className='logo'>LOGO</h3>
            </li>
          </ul>
          <ul className='nav-menu'>
            <li>
              <Link onClick={() => setCurrentRoute("Home")} className={currentRoute === 'Home' ? 'nav-link active' : 'nav-link'} to={"/Home"}>Home</Link>
            </li>
            <li>
              <Link onClick={() => setCurrentRoute("Products")} className={currentRoute === 'Products' ? 'nav-link active' : 'nav-link'} to={"/Products"}>Products</Link>
            </li>
            
            <li>
              <Link onClick={() => setCurrentRoute("Category")} className={currentRoute === 'Category' ? 'nav-link active' : 'nav-link'} to={"/Category"}>categories</Link>
            </li>
          </ul>
          <ul className='nav-bar nav'>
            <li>
              <State></State>
            </li>
          </ul>
        </nav>
        <Footer />
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/newProduct" element={<NewProduct />} />
          <Route path="/editProduct/:id" element={<EditProduct />} />
          <Route path="/Category" element={<Category />}/>
          <Route path="/newCategory" element={<NewCategory />} />

        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
    </AppCategoryContext.Provider>
  );
}

export default App;


//m-1 p-1 border border-info navbar navbar-expand-lg navbar-light bg-light