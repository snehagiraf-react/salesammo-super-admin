import React from 'react'
import { useState } from "react";
import { Eye } from "lucide-react";
import CompanyModal from "./modal/companyModal";
import "../../src/assets/styles/button.css";

const companyData = [
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
  const [company] = useState(companyData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [actionType, setActionType] = useState('');
  const [reason, setReason] = useState('');

  const handleAction = (action, companyId, companyName) => {
    if (action === "Disable" || action === "Enable") {
      const companyInfo = company.find(c => c.id === companyId);
      setSelectedCompany(companyInfo);
      setActionType(action);
      setReason('');
      setIsModalOpen(true);
    } else {
      console.log(`${action} company ${companyId}`);
    }
  };

  const handleConfirmAction = () => {
    console.log(`${actionType} company ${selectedCompany.id} with reason: ${reason}`);
    setIsModalOpen(false);
    setReason('');
    setSelectedCompany(null);
  };

  const getStatusBadgeClass = (status) => {
    return status === "ACTIVE" ? "status-active" : "status-draft";
  };

  return (
    <>
    {/* Products Table */}
      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Email</th>
              <th>Users</th>
              <th>Revenue</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {company.map((company) => (
              <tr key={company.id}>
                {/* COMPANY NAME */}
                <td className="company-name">{company.name}</td>

                {/* EMAIL */}
                <td className="company-email">{company.email}</td>

                {/* USERS */}
                <td className="company-users">{company.users}</td>

                {/* REVENUE */}
                <td className="company-revenue">{company.revenue}</td>

                {/* STATUS */}
                <td>
                  <span className={`status-badge ${getStatusBadgeClass(company.status)}`}>
                    {company.status}
                  </span>
                </td>

                {/* ACTIONS */}
                <td>
                  <div className="actions-container">
                    <button className="action-icon-btn" onClick={() => handleAction("View", company.id, company.name)}>
                      <Eye size={18} />
                    </button>
                    <button 
                      className={company.status === "ACTIVE" ? "action-btn-disable" : "action-btn-enable"}
                      onClick={() => handleAction(company.status === "ACTIVE" ? "Disable" : "Enable", company.id, company.name)}
                    >
                      {company.status === "ACTIVE" ? "DISABLE" : "ENABLED"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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