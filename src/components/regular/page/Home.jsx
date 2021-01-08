import React, { useState, useEffect } from "react";
import axios from "axios";
import fileDownload from "js-file-download";
import globalUrl from "../../../utils/url";
import NavBar from "../NavBar";

const Home = () => {
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
      console.log(name);
      fileDownload(resp.data, name);
    });
  };

  return (
    <div className="bg-black h-screen">
      <NavBar />
      <div className="container">
        <div className="text-center">
          <h1 className="w-full py-3 my-6 font-medium tracking-widest text-white text-xl uppercase bg-black shadow-lg focus:outline-none">
            Novedades
          </h1>
          <div className="container">
            <ul className="rounded border-2 border-white flex flex-row p-6 m-3">
              {albums &&
                albums.map((album) => {
                  return (
                    <li
                      className="p-3 w-1/5 hover:bg-gray-900 hover:shadow-none cursor-pointer"
                      onClick={() => albumDownload(album._id)}
                    >
                      <img
                        className="h-18 object-contain border-white"
                        src={globalUrl + album.image}
                        alt="album-img"
                      />
                      <h3 className="pt-3 mt-3 font-medium tracking-widest text-white uppercase truncate">
                        {album.name}
                      </h3>
                      <p className="pt-1 text-white truncate">
                        ({album.artist})
                      </p>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
