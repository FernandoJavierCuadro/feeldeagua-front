import React, { useState, useEffect } from "react";
import axios from "axios";
import fileDownload from "js-file-download";
import { useLocation } from "react-router-dom";
import globalUrl from "../../../utils/url";
import NavBar from "../NavBar";

const Artist = ({ state }) => {
  const location = useLocation();
  const { artist } = location.state;
  const [artistObj, setArtistObj] = useState("");

  useEffect(() => {
    let isMounted = true;
    axios.get(`${globalUrl}/api/v1/artist/${artist._id}`).then((res) => {
      isMounted && setArtistObj(res.data);
    });
    return () => {
      isMounted = false;
    };
  }, [artist._id]);

  const albumDownload = (id) => {
    axios({
      url: `${globalUrl}/api/v1/album/download/${id}`,
      method: "GET",
      responseType: "blob",
    }).then((resp) => {
      let name = resp.headers["content-disposition"];
      name = name.split("-");
      name = name[name.length - 1].replace('"', "");
      fileDownload(resp.data, name);
    });
  };

  return (
    <div className="">
      <NavBar />
      <div className="bg-black min-h-screen">
        <div className="container py-3">
          <div className="mt-24"></div>
          <div className="text-center">
            <h1 className="w-full py-3 my-6 font-medium tracking-widest text-white text-xl uppercase bg-black shadow-lg focus:outline-none">
              {artistObj.name}
            </h1>
            <div className="container">
              <div className="flex flex-row">
                <div className="rounded border-2 border-white grid grid-cols-2 p-6 my-3 ml-3 flex-1">
                  <div className="px-5">
                    <img
                      className="border-white object-fit h-60"
                      src={globalUrl + artistObj.image}
                      alt="artist-img"
                    />
                  </div>
                  <div className="text-white">{artistObj.description}</div>
                </div>
                <div className="rounded border-2 border-white p-6 m-3">
                  {artistObj.albums &&
                    artistObj.albums.map((album) => {
                      return (
                        <div className="w-56 h-56 content-center img__wrap">
                          <img
                            className="h-18 object-contain p-3"
                            src={globalUrl + album.image}
                            alt="album-img"
                          />
                          <div className="img__content align-middle">
                            <h3 className="py-3 mt-3 text-sm text-white uppercase truncate">
                              {album.name}
                            </h3>
                            <button
                              className="bg-gray-900 font-medium tracking-widest text-white text-xl uppercase p-3"
                              onClick={() => albumDownload(album._id)}
                            >
                              Descargar
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artist;
