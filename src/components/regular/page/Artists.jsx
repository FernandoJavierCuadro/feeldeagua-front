import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import globalUrl from "../../../utils/url";
import NavBar from "../NavBar";

const Artists = () => {
  const [artists, setArtists] = useState(null);

  useEffect(() => {
    let isMounted = true;
    axios.get(`${globalUrl}/api/v1/artists`).then((res) => {
      isMounted && setArtists(res.data);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="">
      <NavBar />
      <div className="bg-black">
        <div className="container py-3">
          <div className="mt-24"></div>
          <div className="text-center">
            <h1 className="w-full py-3 my-6 font-medium tracking-widest text-white text-xl uppercase bg-black shadow-lg focus:outline-none">
              Artistas
            </h1>
            <div className="container px-40">
              <div className="rounded border-2 border-white grid grid-cols-3 p-6 m-3">
                {artists &&
                  artists.map((artist) => {
                    return (
                      <Link
                        to={{
                          pathname:
                            "/artistas/" +
                            artist.name.toLowerCase().trim().replace(/ /g, "-"),
                          state: { artist },
                        }}
                      >
                        <div className="p-3 hover:bg-gray-900 hover:shadow-none cursor-pointer">
                          <img
                            className="border-white object-fit h-40 mx-auto"
                            src={globalUrl + artist.image}
                            alt="artist-img"
                          />
                          <h3 className="pt-3 mt-3 font-medium tracking-widest text-white uppercase truncate">
                            {artist.name}
                          </h3>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artists;
