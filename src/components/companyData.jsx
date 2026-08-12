import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Datatable from "./common/datatable";
import CompanyModal from "./modal/companyModal";
import "../../src/assets/styles/button.css";

const CompanyData = ({ data = [] }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [actionType, setActionType] = useState("");
  const [reason, setReason] = useState("");

  const resolveImageUrl = (path) => {
    if (!path) return "";
    if (/^https?:\/\//i.test(path)) return path;
    const base = (process.env.REACT_APP_IMAGE_BASE_URL || "").replace(/\/+$/, "");
    const relative = String(path).replace(/^\/+/, "");
    return `${base}/${relative}`;
  };

  // Define the columns structure for the table
  const columns = [
    {
      key: "logo",
      label: "Logo",
      className: "company-logo",
      render: (value) =>
        value ? (
          <img
            src={resolveImageUrl(value)}
            alt="Logo"
            style={{ width: 32, height: 32, objectFit: "cover" }}
          />
        ) : null,
    },
    { key: "name", label: "Company Name" },
    { key: "email", label: "Email",render: (value) => <td className="tab-tds">{value}</td>,},
    { key: "phoneNumber", label: "PhoneNumber",render: (value) => <td className="tab-tds">{value}</td>, },
    { key: "status", label: "Status" },
  ];

  // Define available actions
  const actions = [{ type: "view" }, ];

  const handleTableAction = (actionData) => {
    const { type, id, rowData } = actionData;

    if (type === "view") {
      navigate(`/companies/${id || rowData?._id || rowData?.id}`);
      return;
    }

    if (type === "disable" || type === "enable") {
      setSelectedCompany(rowData);
      setActionType(type === "disable" ? "Disable" : "Enable");
      setReason("");
      setIsModalOpen(true);
    }
  };

  const handleConfirmAction = () => {
    console.log(
      `${actionType} company ${selectedCompany?.id} with reason: ${reason}`,
    );
    setIsModalOpen(false);
    setReason("");
    setSelectedCompany(null);
    
  };

  return (
    <>
      <Datatable
        data={data}
        columns={columns}
        actions={actions}
        onAction={handleTableAction}
      />

      <CompanyModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setReason("");
          setSelectedCompany(null);
        }}
        company={selectedCompany}
        actionType={actionType}
        reason={reason}
        setReason={setReason}
        onConfirm={handleConfirmAction}
      />
    </>
  );
};

export default CompanyData;
