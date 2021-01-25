import React from "react";
import Tilt from "react-tilt";
import { Link } from "react-router-dom";

const Intro = () => {
  return (
    <div className="container h-screen bg-black flex items-center justify-center">
      <Tilt
        className="Tilt m-auto"
        options={{ reverse: true, max: 45, perspective: 800, reset: true }}
        style={{ height: 450, width: 450 }}
      >
        <div className="Tilt-inner">
          <Link to="/discos">
            <img src="/images/feeldeaguanegro.gif" alt="" />{" "}
          </Link>
        </div>
      </Tilt>
    </div>
  );
};

export default Intro;
