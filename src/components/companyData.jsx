import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Datatable from "./common/datatable";
import CompanyModal from "./modal/companyModal";
import "../../src/assets/styles/button.css";

export const companyData = [
  {
    id: 1,
    name: "TechCorp Inc.",
    email: "contact@techcorp.com",
    users: 26,
    revenue: "$48,500",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Acme Ltd",
    email: "info@acme.com",
    users: 39,
    revenue: "$89,500",
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "Global Solutions",
    email: "hello@globalsolutions.com",
    users: 17,
    revenue: "$34,800",
    status: "ACTIVE",
  },
  {
    id: 4,
    name: "Innovation Labs",
    email: "contact@innovationlabs.com",
    users: 31,
    revenue: "$67,600",
    status: "DISABLE",
  },
  {
    id: 5,
    name: "Cloud Tech Pro",
    email: "info@cloudtechpro.com",
    users: 12,
    revenue: "$28,900",
    status: "ACTIVE",
  },
  {
    id: 6,
    name: "Enterprise Hub",
    email: "contact@enterprisehub.com",
    users: 38,
    revenue: "$78,500",
    status: "ACTIVE",
  },
];

const CompanyData = () => {
  const navigate = useNavigate();
  const [company] = useState(companyData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [actionType, setActionType] = useState('');
  const [reason, setReason] = useState('');

  // Define the columns structure for the table
  const columns = [
    { key: 'name', label: 'Company Name', className: 'company-name' },
    { key: 'email', label: 'Email', className: 'company-email' },
    { key: 'users', label: 'Users', className: 'company-users' },
    { key: 'revenue', label: 'Revenue', className: 'company-revenue' },
    { key: 'status', label: 'Status' },
  ];

  // Define available actions
  const actions = [
    { type: 'view' },
    { type: 'disable' }
  ];

  const handleTableAction = (actionData) => {
    const { type, id, rowData } = actionData;

    if (type === 'view') {
      navigate(`/companies/${id}`);
      return;
    }

    if (type === 'disable' || type === 'enable') {
      setSelectedCompany(rowData);
      setActionType(type === 'disable' ? 'Disable' : 'Enable');
      setReason('');
      setIsModalOpen(true);
    }
  };

  const handleConfirmAction = () => {
    console.log(`${actionType} company ${selectedCompany.id} with reason: ${reason}`);
    setIsModalOpen(false);
    setReason('');
    setSelectedCompany(null);
  };

  return (
    <>
      <Datatable
        data={company}
        columns={columns}
        actions={actions}
        onAction={handleTableAction}
      />

      <CompanyModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setReason('');
          setSelectedCompany(null);
        }}
        company={selectedCompany}
        actionType={actionType}
        reason={reason}
        setReason={setReason}
        onConfirm={handleConfirmAction}
      />
    </>
  )
}

export default CompanyData