import React, { useState } from "react";
import Datatable from "./common/datatable";
import PackageModal from "./modal/packageModal";

/**
 * Alternative Packages Component using Datatable
 * This shows how to display packages in a table format instead of cards
 */

const PackagesTable = () => {
  const [packages, setPackages] = useState([
    {
      id: 1,
      plan: "Starter",
      price: "$29",
      users: "10",
      products: "50",
      shares: "1,000",
      support: "Email",
      status: "ACTIVE",
    },
    {
      id: 2,
      plan: "Professional",
      price: "$99",
      users: "50",
      products: "500",
      shares: "10,000",
      support: "Priority",
      status: "ACTIVE",
    },
    {
      id: 3,
      plan: "Enterprise",
      price: "$399",
      users: "Unlimited",
      products: "Unlimited",
      shares: "Unlimited",
      support: "24/7",
      status: "ACTIVE",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [modalMode, setModalMode] = useState("edit");

  // Define the columns for the packages table
  const columns = [
    { key: "plan", label: "Plan Name" },
    { key: "price", label: "Price" },
    { key: "users", label: "Max Users" },
    { key: "products", label: "Products" },
    { key: "shares", label: "Shares/Month" },
    { key: "support", label: "Support" },
    { key: "status", label: "Status" },
  ];

  // Define available actions for the table
  const actions = [
    { type: "view" },
    { type: "edit" },
    { type: "delete" },
  ];

  // Handle table actions
  const handleTableAction = (actionData) => {
    const { type, id, rowData } = actionData;

    if (type === "view") {
      console.log("View package", rowData);
      return;
    }

    if (type === "edit") {
      setModalMode("edit");
      setSelectedPackage(rowData);
      setIsModalOpen(true);
    }

    if (type === "delete") {
      // Handle delete
      const updatedPackages = packages.filter((pkg) => pkg.id !== id);
      setPackages(updatedPackages);
      console.log("Delete package", rowData);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

  return (
    <>
      {/* Packages Table */}
      <Datatable
        data={packages}
        columns={columns}
        actions={actions}
        onAction={handleTableAction}
      />

      {/* Package Modal for edit/create */}
      <PackageModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        formData={selectedPackage}
        setFormData={setSelectedPackage}
        mode={modalMode}
      />
    </>
  );
};

export default PackagesTable;
