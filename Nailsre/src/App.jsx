import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Gallery from "./components/Gallery";
import Shop from "./components/Shop";
import Reviews from "./components/Reviews";
import BookNow from "./components/bookNow";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/book-now" element={<BookNow />} />
      </Routes>
    </Router>
  );
}

export default App;
