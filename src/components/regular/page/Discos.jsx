import React, { useState, useEffect } from "react";
import axios from "axios";
import fileDownload from "js-file-download";
import globalUrl from "../../../utils/url";
import NavBar from "../NavBar";

const Discos = () => {
  const [albums, setAlbums] = useState(null);

  useEffect(() => {
    let isMounted = true;
    axios.get(`${globalUrl}/api/v1/albums`).then((res) => {
      isMounted && setAlbums(res.data);
    });
    return () => {
      isMounted = false;
    };
  }, []);

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
              Discos
            </h1>
            <div className="container">
              <div className="rounded border-2 grid grid-cols-5 p-6">
                {albums &&
                  albums.map((album) => {
                    return (
                      <div className="p-3 img__wrap">
                        <img
                          className="h-18 object-contain"
                          src={globalUrl + album.image}
                          alt="album-img"
                        />
                        <div className="img__content align-middle">
                          <h3 className="py-3 mt-3 mx-3 text-xs text-white uppercase truncate">
                            {album.name}
                          </h3>
                          <p className="pb-3 mx-3 text-xs text-white truncate">
                            ({album.artist})
                          </p>
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
  );
};

export default Discos;
