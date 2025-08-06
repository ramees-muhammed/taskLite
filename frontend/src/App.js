import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";  
import { AnimatePresence } from "framer-motion";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import './styles/App.css';

import Home from "./pages/Home";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="container-fluid my-4 flex-grow-1 px-3 px-sm-5">
          <ToastContainer position="top-right" autoClose={2000} />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
