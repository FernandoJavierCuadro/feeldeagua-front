import React from "react";

const SearchBox = ({ setSearch }) => {
  return (
    <div class="py-3 mt-6 text-gray-600">
      <input
        class="border-2 border-gray-300 bg-white h-12 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        type="search"
        placeholder="Buscar"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
