import React from "react";

const SearchBox = ({ setSearch }) => {
  return (
    <div className="py-3 text-gray-600">
      <input
        className="border-2 border-black bg-white h-12 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        type="search"
        placeholder="Buscar"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
