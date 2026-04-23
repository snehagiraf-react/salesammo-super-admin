import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getPageTitle } from "../../utils/getPageTitle";
import "../../assets/styles/company.css";
import CompanyData from "../../components/companyData";
import { useViewCompanyQuery } from "../../hooks/company/viewCompany";
import SearchFilter from "../../components/common/search";

const Companies = () => {
  const [company, setCompany] = React.useState([]);
  const { data: companyData, isLoading, isError } = useViewCompanyQuery();

  // Debug log to see the actual API response
  console.log("companyData from API:", companyData);

  useEffect(() => {
    if (companyData) {
      // Handles both array and object with data property
      setCompany(Array.isArray(companyData) ? companyData : companyData.data);
    }
  }, [companyData]);

  console.log("Company state:", company);

  const location = useLocation();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading companies</div>;

  return (
    <>
      <div className="companies-page">
        <h1 className="page-title">{getPageTitle(location.pathname)}</h1>
        <SearchFilter placeholder="Search by product name..." />
      </div>
      <CompanyData data={company} />
    </>
  );
};

export default Companies;
