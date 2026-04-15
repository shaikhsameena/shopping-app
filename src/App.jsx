import { useRef, useState} from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Required for dropdowns, modals, etc.

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { routes } from "./Router/routes";
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home';

import Service from './Pages/Service';
import Product from './Pages/Product';
import Support from './Pages/Support';
import Contact from './Pages/Contact';
import { store } from './redux/store';
import { Provider } from "react-redux";


import Profile from './Pages/profile/Profile';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
          <Header />
          <main className="content-wrap">
            <Routes>
              <Route path="/" element={<Home />} />
              

              <Route path="/profile" element={<Profile />} />
              <Route path="/service" element={<Service />} />
              <Route path="/product" element={<Product />} />
              <Route path="/support" element={<Support />} />
              <Route path="/contact" element={<Contact />} />
              
              

              
            </Routes>
          </main>
          <Footer/>
        </div>
      </Router>
    </Provider>
  );
}


export default App;
