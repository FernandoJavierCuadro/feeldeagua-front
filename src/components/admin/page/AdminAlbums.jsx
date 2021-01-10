import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import globalUrl from "../../../utils/url";
import SearchBox from "../../SearchBox";

const AdminAlbums = () => {
  const token = useSelector((store) => store.user.token);
  const [albums, setAlbums] = useState(null);
  const [search, setSearch] = useState(null);

  useEffect(() => {
    let isMounted = true;
    let url = `${globalUrl}/api/v1/admin/albums`;
    search && (url = url.concat(`/search?name=${search}`));

    axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: url,
    }).then((res) => {
      isMounted && setAlbums(res.data);
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
      url: `${globalUrl}/api/v1/admin/albums`,
      data: {
        _id: _id,
      },
    }).then((res) => {
      setAlbums(albums.filter((album) => album._id !== _id));
    });
  };

  return (
    <div className="container">
      <div className="mx-4">
        <div className="flex justify-between">
          <div className="py-3 mt-6">
            <SearchBox setSearch={setSearch} />
          </div>
          <Link to="/admin/albums/create" className="py-3">
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
            Albumes
          </h1>
          <table className="w-full flex flex-row flex-no-wrap sm:bg-white overflow-hidden sm:shadow-lg my-5">
            <thead className="text-white">
              <tr className="bg-green-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                <th className="py-3 px-3 text-center">Imagen</th>
                <th className="py-3 px-3 text-center">Nombre</th>
                <th className="py-3 px-3 text-center">Descripcion</th>
                <th className="py-3 px-3 text-center">Año</th>
                <th className="py-3 px-3 text-center">Artista</th>
                <th className="py-1 px-1 text-center">Oculto</th>
                <th className="py-1 px-1 text-center">Actualizar</th>
                <th className="py-1 pl-1 text-center">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {albums &&
                albums.map((album) => {
                  return (
                    <tr>
                      <td className="text-center truncate max-w-0 px-1">
                        <img
                          className="h-18 object-contain"
                          src={globalUrl + album.image}
                          alt="album-img"
                        />
                      </td>
                      <td className="text-center truncate max-w-sm">
                        {album.name}
                      </td>
                      <td className="text-center truncate max-w-0">
                        {album.description}
                      </td>
                      <td className="text-center truncate max-w-0">
                        {album.releaseYear}
                      </td>
                      <td className="text-center truncate max-w-0">
                        {album.artist}
                      </td>
                      <td className="text-center">
                        {album.draft ? (
                          <i className="far fa-check-square"></i>
                        ) : (
                          <i className="far fa-square"></i>
                        )}
                      </td>
                      <td className="text-center">
                        <Link
                          to={{
                            pathname:
                              "/admin/albums/" +
                              album.name
                                .toLowerCase()
                                .trim()
                                .replace(/ /g, "-"),
                            state: { album },
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
                          onClick={() => handleDelete(album._id)}
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

export default AdminAlbums;
