import React, { useEffect, useMemo, useState } from "react";
import { Funnel } from "lucide-react";

/**
 * Reusable search + filter UI.
 * - Keeps search term state internally
 * - Emits filtered results to parent via `onResultsChange`
 */
const SearchItem = ({
  data = [],
  // default: search by "title" (can be string or array of strings)
  searchField = "title",
  placeholder = "Search...",
  onResultsChange,
}) => {
  const [searchItem, setSearchItem] = useState("");

  const filteredData = useMemo(() => {
    const term = searchItem.trim().toLowerCase();
    if (!term) return data;

    const fields = Array.isArray(searchField) ? searchField : [searchField];

    return (data || []).filter((item) => {
      return fields.some((field) => {
        const value = item?.[field];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(term);
      });
    });
  }, [data, searchField, searchItem]);

  useEffect(() => {
    if (typeof onResultsChange === "function") {
      onResultsChange({ searchItem, filteredData });
    }
  }, [filteredData, onResultsChange, searchItem]);

  return (
    <div className="subscription-section">
      <div className="products-search-container">
        <input
          type="text"
          placeholder={placeholder}
          className="products-search-input"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          style={{ width: "100%" }}
        />
        {/* <button className="products-filter-button" type="button">
          <Funnel size={20} />
          Filter
        </button> */}
      </div>
    </div>
  );
};

export default SearchItem;
