import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import globalUrl from "../../../utils/url";
import SearchBox from "../../SearchBox";

const Artists = () => {
  const token = useSelector((store) => store.user.token);
  const [artists, setArtists] = useState(null);
  const [search, setSearch] = useState(null);
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    let url = `${globalUrl}/api/v1/admin/artists`;
    search && (url = url.concat(`/search?name=${search}`));
    axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: `${globalUrl}/api/v1/admin/artists`,
    }).then((res) => {
      setArtists(res.data);
    });
  }, [search, artist]);

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
      <div className="ml-4 mt-12 mb-12 mr-4">
        <div className="flex justify-between">
          <SearchBox setSearch={setSearch} />
          <Link to="/admin/artists/create">
            <button
              className="w-full py-3 px-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
              type="btn"
            >
              Nuevo
            </button>
          </Link>
        </div>
        <div className="container text-center">
          <h1 className="text-5xl">Artistas</h1>
          <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
            <thead className="text-white">
              <tr className="bg-green-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                <th className="py-3 pl-3 text-center">Image</th>
                <th className="py-3 pl-3 text-center">Name</th>
                <th className="py-3 pl-3 text-center">Description</th>
                <th className="py-3 pl-3 text-center">Albums</th>
                <th className="py-3 pl-3 text-center">Update</th>
                <th className="py-3 pl-3 text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {artists &&
                artists.map((artist) => {
                  return (
                    <tr>
                      <td className="text-center truncate max-w-0">
                        {artist.name}
                      </td>
                      <td className="text-center truncate max-w-0">
                        {artist.name}
                      </td>
                      <td className="text-center truncate max-w-sm">
                        {artist.description}
                      </td>
                      <td className="text-center">{artist.albums}</td>
                      <td className="text-center max-w-0">
                        <Link to="/admin/artists/update">
                          <button className="btn">
                            {" "}
                            <i className="fas fa-edit"></i>
                          </button>
                        </Link>
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

export default Artists;
