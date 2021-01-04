import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBox from "../SearchBox";

const NavBar = ({}) => {
  const [search, setSearch] = useState(null);

  return (
    <nav className="relative flex flex-wrap items-center px-2 py-3 navbar-expand-lg border-b-2 border-black">
      <div className="container px-4 mx-auto flex items-center justify-between">
        <div className="w-full relative flex flex-row">
          <Link
            to="/"
            className="mt-3 leading-relaxed inline-block mr-4"
            href="intro"
          >
            <img
              src="/images/logo-feel-redondo-blanco4.png"
              className="rounded-full w-12 h-12 border-2 border-black hover:bg-gray-600 hover:shadow-none"
              alt="feeldeagua-logo"
            />
          </Link>
          <SearchBox setSearch={setSearch} />
        </div>
        <div className="w-auto relative">
          <ul className="flex flex-row whitespace-nowrap">
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
