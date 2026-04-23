import React, { useState, useEffect } from "react";

const SearchFilter = ({ onSearch, placeholder = "Search...", delay = 300 }) => {
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState(value);

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  // Trigger search callback
  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue, onSearch]);

  return (
    <div className="products-search-container">
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        className="products-search-input"
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default SearchFilter;