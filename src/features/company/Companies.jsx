import { useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { getPageTitle } from "../../utils/getPageTitle";
import "../../assets/styles/company.css";
import CompanyData from "../../components/companyData";
import { useViewCompanyQuery } from "../../hooks/company/viewCompany";
import SearchItem from "../../components/common/searchItem";
import Pagination, { usePagination } from "../../components/common/pagination";

const Companies = () => {
  const [company, setCompany] = useState([]);
  const { data: companyData, isLoading, isError } = useViewCompanyQuery();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (companyData) {
      // Handles both array and object with data property
      setCompany(Array.isArray(companyData) ? companyData : companyData.data);
    }
  }, [companyData]);

  const rows = useMemo(
    () => (isSearching ? filteredUsers : company),
    [isSearching, filteredUsers, company],
  );

  const { currentPage, currentItems, totalPages, handlePageChange } =
    usePagination(rows, 5);

  const location = useLocation();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading companies</div>;

  return (
    <>
      <div className="companies-page">
        <h1 className="page-title">{getPageTitle(location.pathname)}</h1>
      </div>
      
      {/* SEARCH */}
      <SearchItem
        data={company}
        searchField={[
          "name",
          "email",
          "phoneNumber",
          "status",
          // Legacy/back-end variants (kept for compatibility)
          "company_name",
          "company_email",
          "company_phone",
          "company_address",
          "company_city",
          "company_state",
        ]}
        placeholder="Search companies..."
        onResultsChange={({ filteredData, searchItem }) => {
          setFilteredUsers(filteredData);

          setIsSearching(searchItem?.trim()?.length > 0);
        }}
      />

      <CompanyData data={currentItems} />

      {rows.length > 0 && (
        <div className="activity-pagination">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          <span>
            Showing {currentItems.length} of {rows.length} companies
          </span>
        </div>
      )}
    </>
  );
};

export default Companies;
