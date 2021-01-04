import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBox from "../SearchBox";

const NavBar = ({}) => {
  const [search, setSearch] = useState(null);

  return (
    <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg nav-color">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex flex-wrap justify-items-start lg:w-auto lg:static lg:block lg:justify-start">
          <Link
            to="/"
            className="mt-6 text-sm font-bold leading-relaxed inline-block mr-4 whitespace-no-wrap uppercase text-white"
            href="intro"
          >
            <img
              src="/images/logo-feel-redondo-blanco4.png"
              className="rounded-full w-10 h-10"
              alt="feeldeagua-logo"
            />
          </Link>
          <SearchBox setSearch={setSearch} />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
