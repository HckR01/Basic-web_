import React from "react";
import Navbar from "./Navbar";
import VideoIntro from "./VideoIntro";
import About from "./About";
import Product from "./Product";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="min-h-screen">
      <marquee
        className="text-center text-xs md:text-sm font-bold text-pink-700 mt-2 mb-1 px-4 lg:px-8"
        behavior="scroll"
        direction="left"
        scrollamount="12"
        loop="infinite"
      >
        Book your appointment here and get 20% off, share with friends and
        family! &nbsp;&nbsp;&nbsp; Book your appointment here and get 20% off,
        share with friends and family!
      </marquee>
      <Navbar />
      <VideoIntro />
      <About />
      {/* <Gallery /> */}
      <Product />
      <Footer />
    </div>
  );
};

export default Home;
