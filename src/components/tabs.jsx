import React, { useState } from "react";
import "../assets/styles/tabs.css";

const Tabs = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="tabs-container">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`tab-btn ${activeTab === tab.key ? "active" : ""}`}
          onClick={() => onChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;