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
    axios.get(url).then((res) => {
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
      <div className="ml-8 mt-12 mb-12 mr-4">
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
      </div>
    </div>
  );
};

export default Artists;
