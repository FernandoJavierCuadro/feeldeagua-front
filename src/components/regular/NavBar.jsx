import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import globalUrl from "../../utils/url";
import SearchBox from "../SearchBox";

const NavBar = () => {
  const [search, setSearch] = useState("");
  const [dropDown, setDropDown] = useState(null);

  if (search === "") {
    setSearch(null);
    setDropDown(null);
  }

  useEffect(() => {
    let url = `${globalUrl}/api/v1/artists/search?name=${search}`;
    axios.get(url).then((res) => {
      setDropDown(res.data);
    });
  }, [search]);

  function handleLink() {
    setDropDown(null);
  }

  return (
    <nav className="fixed flex flex-wrap w-screen items-center px-2 border-b-2 bg-white z-50">
      <div className="container px-4 mx-auto flex items-center justify-between">
        <div className="w-full relative flex flex-row">
          <img
            src="/images/logo-feel-redondo-blanco4.png"
            className="mt-3 leading-relaxed inline-block mr-4 rounded-full w-12 h-12 border-2 border-black hover:bg-gray-600 hover:shadow-none"
            alt="feeldeagua-logo"
          />
          <div className="flex flex-column relative">
            <div className="pt-3">
              <SearchBox setSearch={setSearch} />
            </div>
            <ul className="origin-top-left absolute left-0 mt-16 rounded-md shadow-lg bg-white w-full">
              {dropDown &&
                dropDown.map((artist) => {
                  return (
                    <li className="mx-3 text-black">
                      <Link
                        to={{
                          pathname:
                            "/artistas/" +
                            artist.name.toLowerCase().trim().replace(/ /g, "-"),
                          state: { artist },
                        }}
                        onClick={handleLink}
                      >
                        {artist.name}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        <div className="w-auto relative">
          <ul className="flex flex-row whitespace-nowrap">
            <li className="mx-3 font-medium tracking-widest uppercaseshadow-lg focus:outline-none hover:text-gray-600 hover:shadow-none">
              <Link to="/discos">Discos</Link>
            </li>
            <li className="mx-3 font-medium tracking-widest uppercaseshadow-lg focus:outline-none hover:text-gray-600 hover:shadow-none">
              <Link to="/artistas">Artistas</Link>
            </li>
            <li className="mx-3 font-medium tracking-widest uppercaseshadow-lg focus:outline-none hover:text-gray-600 hover:shadow-none">
              <Link to="/sobre-nosotros">Sobre nosotros</Link>
            </li>
            <li className="mx-3 font-medium tracking-widest uppercaseshadow-lg focus:outline-none hover:text-gray-600 hover:shadow-none">
              <Link to="/contacto">Contacto</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
