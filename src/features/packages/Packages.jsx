import React from "react";
import { useLocation } from "react-router-dom";
import { getPageTitle } from "../../utils/getPageTitle";
import { Plus } from "lucide-react";
import "../../assets/styles/package.css";
import Packages from "../../components/packages";
import Button from "../../components/common/button";

const PackagesData = () => {
  const packagesRef = React.useRef(null);
  const location = useLocation();

  const handleAddPackage = () => {
    if (packagesRef.current) {
      packagesRef.current.openAddModal();
    }
  };

  return (
    <>
      <div className="page-body">
        <div className="page-header">
          <h1 className="page-title">{getPageTitle(location.pathname)}</h1>
          <p style={{ color: "rgb(85, 85, 85)", fontSize: "13px" }}>
            Manage your subscription and billing
          </p>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <Button onClick={handleAddPackage}>
            <Plus size={18} />
            Add Packages
          </Button>
        </div>
      </div>

      <Packages ref={packagesRef} />
    </>
  );
};

export default PackagesData;
