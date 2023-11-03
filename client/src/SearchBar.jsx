import React, { useState } from 'react';

function SearchBar({ onSearch }) { 

  const handleSearch = (value) => {
    console.log(value);
    onSearch(value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter ingredients"
       
        onChange={(e) => handleSearch(e.target.value)}
      /> 
    </div>
  );
}

export default SearchBar;
