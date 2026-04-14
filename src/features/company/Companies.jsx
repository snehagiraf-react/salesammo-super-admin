import React from "react";
import { useLocation } from "react-router-dom";
import { getPageTitle } from "../../utils/getPageTitle";
import "../../assets/styles/company.css";
import CompanyData from "../../components/companyData";

const Companies = () => {
  const location = useLocation();
  return (
    <>
    <div className="companies-page">
      <h1 className="page-title">{getPageTitle(location.pathname)}</h1>
      <div className="products-search-container">
          <input
            type="text"
            placeholder="Search by product name..."
            className="products-search-input"
          />
         
        </div>
      
    </div>
    <CompanyData />

    </>
  );
};

export default Companies;
