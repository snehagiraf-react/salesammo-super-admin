import { useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { BadgePlus } from "lucide-react";
import toast from "react-hot-toast";
import { getPageTitle } from "../../utils/getPageTitle";
import "../../assets/styles/company.css";
import CompanyData from "../../components/companyData";
import {
  useViewCompanyQuery,
  useCompanyStore,
} from "../../hooks/company/viewCompany";
import SearchItem from "../../components/common/searchItem";
import Pagination, { usePagination } from "../../components/common/pagination";
import Button from "../../components/common/button";
import CreateCompanyModal from "../../components/modal/createCompanyModal";

const emptyForm = {
  name: "",
  email: "",
  country: "",
  phoneNumber: "",
  password: "",
  websiteUrl: "",
  Designation: "",
  logo: null,
  visitingCard: null,
  visitingCardTemplate: false,
};

const Companies = () => {
  const [company, setCompany] = useState([]);
  const {
    data: companyData,
    isLoading,
    isError,
    refetch,
  } = useViewCompanyQuery();
  const companyMutation = useCompanyStore();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (companyData) {
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

  const handleAddCompany = () => {
    setFormData({ ...emptyForm });
    setIsModalOpen(true);
  };

  const handleSaveCompany = (payload) => {
    companyMutation.mutate(payload, {
      onSuccess: async (res) => {
        const created = res?.data;
        toast.success(res?.message || "Company created successfully");
        setIsModalOpen(false);
        setFormData({ ...emptyForm });
        setIsSearching(false);

        if (created?._id || created?.id) {
          setCompany((prev) => {
            const createdId = created._id || created.id;
            const withoutDup = (Array.isArray(prev) ? prev : []).filter(
              (item) => (item._id || item.id) !== createdId,
            );
            return [created, ...withoutDup];
          });
        }

        await refetch();
      },
      onError: (err) => {
        toast.error(
          err.response?.data?.message || "Failed to create company",
        );
      },
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading companies</div>;

  return (
    <>
      <div className="companies-page">
        <div className="page-header">
          <h1 className="page-title">{getPageTitle(location.pathname)}</h1>
        </div>
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button onClick={handleAddCompany}>
            <BadgePlus size={18} />
            Create Company
          </Button>
        </div>
      </div>

      <SearchItem
        data={company}
        searchField={[
          "name",
          "email",
          "phoneNumber",
          "status",
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

      <CreateCompanyModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setFormData({ ...emptyForm });
        }}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSaveCompany}
        isLoading={companyMutation.isPending}
      />
    </>
  );
};

export default Companies;
