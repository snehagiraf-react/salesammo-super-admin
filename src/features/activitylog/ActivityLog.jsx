import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { getPageTitle } from "../../utils/getPageTitle";
import SearchFilter from "../../components/common/search";
import Tabs from "../../components/tabs";
import Datatable from "../../components/common/datatable";
import "../../assets/styles/package.css";
import DropdownSelect from "../../components/common/dropdownList";

const ActivityLog = () => {
  const location = useLocation();

  const [activeTab, setActiveTab] = useState("invites");
  const [search, setSearch] = useState("");
  const [range, setRange] = useState("3m");

  const options = [
    { label: "Last 7 days", value: "7d" },
    { label: "Last 30 days", value: "30d" },
    { label: "Last 3 months", value: "3m" },
    { label: "Last year", value: "1y" },
  ];

  // 🔹 Tabs
  const tabs = [
    { key: "invites", label: "Invites" },
    { key: "products", label: "Products" },
    { key: "industries", label: "Industries" },
    { key: "subscriptions", label: "Subscriptions" },
  ];

  // 🔹 Data
  const tabData = {
    invites: [
      {
        action: "User invited",
        details: "angelwilson@tech.com",
        company: "TechCorp Inc.",
        date: "2026-04-13",
        time: "2 hours ago",
      },
      {
        action: "User invited",
        details: "sarah.wilson@acme.com",
        company: "Acme Ltd",
        date: "2026-04-13",
        time: "5 hours ago",
      },
    ],
    products: [
      {
        action: "Product created",
        details: "API Platform",
        company: "TechCorp Inc.",
        date: "2026-04-10",
        time: "3 days ago",
      },
    ],
    industries: [
      {
        action: "Industry added",
        details: "Fintech",
        company: "Global Solutions",
        date: "2026-04-08",
        time: "5 days ago",
      },
    ],
    subscriptions: [
      {
        action: "Subscription upgraded",
        details: "Pro Plan",
        company: "Acme Ltd",
        date: "2026-04-01",
        time: "2 weeks ago",
      },
    ],
  };

  // 🔹 Get current rows
  const rows = tabData[activeTab] || [];

  // 🔹 Filter by search
  const filteredRows = rows.filter((row) =>
    row.details.toLowerCase().includes(search.toLowerCase()),
  );

  // Define columns for Datatable
  const columns = [
    {
      key: "action",
      label: "Action",
      render: (value) => (
        <td className="tab-td">
          {value === "User invited" ? (
            <td className="tab-td">User invited</td>
          ) : value === "Bulk invite" ? (
            <td className="tab-td">Bulk invite</td>
          ) : (
            value
          )}
        </td>
      ),
    },
    {
      key: "details",
      label: "Details",
      render: (value) => <td className="tab-tds">{value}</td>,
    },
    activeTab === "invites"
      ? {
          key: "company",
          label: "Company",
          render: (value) => <td className="tab-tds">{value}</td>,
        }
      : {
          key: "addedBy",
          label: "Added By",
          render: () => <td className="tab-tds">Admin</td>,
        },
    {
      key: "date",
      label: "Date",
      render: (value) => <td className="tab-tds">{value}</td>,
    },
    {
      key: "time",
      label: "Time",
      render: (value) => <td className="tab-tds">{value}</td>,
    },
  ];

  return (
    <>
      {/* Header */}
      <div className="activitylog-header">
        <h1 className="page-title">{getPageTitle(location.pathname)}</h1>
        <div className="activitylog-controls">
          <DropdownSelect options={options} value={range} onChange={setRange} />
          <SearchFilter
            placeholder="Search logs..."
            onSearch={setSearch}
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Datatable */}
      <div style={{ marginTop: "20px" }}>
        <Datatable
          data={filteredRows}
          columns={columns}
          title={null}
          className="activity-table"
        />
        <div className="activitylog-footer">
          <span>
            Showing {filteredRows.length} of {rows.length} activities
          </span>
        </div>
      </div>
    </>
  );
};

export default ActivityLog;
