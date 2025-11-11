import React from "react";
import introVideo from "../assets/introvideo.mp4";

const VideoIntro = () => {
  return (
    <div className="relative w-full">
      <video
        className="w-full h-auto md:h-screen object-cover"
        autoPlay
        muted
        loop
        playsInline
        src={introVideo}
      >
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/30 flex flex-col justify-between items-center text-center text-white pt-16 pb-12">
        <h1
          className="text-4xl md:text-6xl font-bold mb-4"
          style={{ fontFamily: "cursive" }}
        >
          Welcome to NailsRe
        </h1>

        <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-5 rounded-full transition-colors duration-300">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default VideoIntro;
