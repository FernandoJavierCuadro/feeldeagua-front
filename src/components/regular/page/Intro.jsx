import React from "react";
import Tilt from "react-tilt";
import { Link } from "react-router-dom";

const Intro = () => {
  return (
    <div className="container bg-black">
      <Tilt
        className="Tilt m-auto"
        options={{ reverse: true, max: 45, perspective: 800, reset: true }}
        style={{ height: 650, width: 650 }}
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
