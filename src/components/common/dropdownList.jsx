

import React, { useState } from "react";
import { useRef, useEffect } from "react";
import Datatable from "../../components/common/datatable";
import { ChevronDown, Calendar } from "lucide-react";
import "../../assets/styles/dropdown.css";

const DropdownSelect = ({ options = [], value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((opt) => opt.value === value);

  return (
    <div className="dropdown" ref={ref}>
      {/* Trigger */}
      <button
        className="dropdown-trigger"
        onClick={() => setOpen(!open)}
      >
        <Calendar size={16} />
        <span>{selected?.label || "Select"}</span>
        <ChevronDown size={16} />
      </button>

      {/* Menu */}
      {open && (
        <div className="dropdown-menu">
          {options.map((opt) => (
            <div
              key={opt.value}
              className="dropdown-item"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownSelect;