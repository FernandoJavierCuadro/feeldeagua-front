import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import globalUrl from "../../../utils/url";
import SearchBox from "../../SearchBox";

const AdminArtists = () => {
  const token = useSelector((store) => store.user.token);
  const [artists, setArtists] = useState(null);
  const [search, setSearch] = useState(null);

  useEffect(() => {
    let isMounted = true;
    let url = `${globalUrl}/api/v1/admin/artists`;
    search && (url = url.concat(`/search?name=${search}`));
    axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: url,
    }).then((res) => {
      isMounted && setArtists(res.data);
    });
    return () => {
      isMounted = false;
    };
  }, [search, token]);

  const handleDelete = (_id) => {
    axios({
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: `${globalUrl}/api/v1/admin/artists`,
      data: {
        _id: _id,
      },
    }).then((res) => {
      setArtists(artists.filter((artist) => artist._id !== _id));
    });
  };

  return (
    <div className="container">
      <div className="mx-4">
        <div className="flex justify-between">
          <div className="py-3 mt-6">
            <SearchBox setSearch={setSearch} />
          </div>
          <Link to="/admin/artists/create" className="py-3">
            <button
              className="w-full py-3 px-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
              type="btn"
            >
              Nuevo
            </button>
          </Link>
        </div>
        <div className="container text-center">
          <h1 className="text-5xl uppercase italic tracking-widest pb-5">
            Artistas
          </h1>
          <table className="w-full flex flex-row flex-no-wrap sm:bg-white overflow-hidden sm:shadow-lg my-5">
            <thead className="text-white">
              <tr className="bg-green-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                <th className="py-3 px-3 text-center">Imagen</th>
                <th className="py-3 px-3 text-center">Nombre</th>
                <th className="py-3 px-3 text-center">Descripcion</th>
                <th className="py-3 px-3 text-center">Albumes</th>
                <th className="py-3 px-1 text-center">Oculto</th>
                <th className="py-3 px-1 text-center">Actualizar</th>
                <th className="py-3 pl-1 text-center">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {artists &&
                artists.map((artist) => {
                  return (
                    <tr>
                      <td className="text-center truncate max-w-0 px-1">
                        <img
                          className="h-18 object-contain"
                          src={globalUrl + artist.image}
                          alt="artist-img"
                        />
                      </td>
                      <td className="text-center truncate max-w-sm">
                        {artist.name}
                      </td>
                      <td className="text-center truncate max-w-0">
                        {artist.description}
                      </td>
                      <td className="max-w-0 text-center truncate">
                        <ul className="">
                          {artist.albums.map((album) => {
                            return <li className="truncate">{album.name}</li>;
                          })}
                        </ul>
                      </td>
                      <td className="text-center">
                        {artist.draft ? (
                          <i className="far fa-check-square"></i>
                        ) : (
                          <i className="far fa-square"></i>
                        )}
                      </td>
                      <td className="text-center">
                        <Link
                          to={{
                            pathname:
                              "/admin/artists/" +
                              artist.name
                                .toLowerCase()
                                .trim()
                                .replace(/ /g, "-"),
                            state: { artist },
                          }}
                        >
                          <button className="btn">
                            {" "}
                            <i className="fas fa-edit"></i>
                          </button>
                        </Link>
                      </td>
                      <td className="text-center">
                        <button
                          className="btn"
                          onClick={() => handleDelete(artist._id)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminArtists;
