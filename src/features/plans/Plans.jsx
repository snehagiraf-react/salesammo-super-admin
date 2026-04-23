import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPageTitle } from "../../utils/getPageTitle";
import { Plus } from "lucide-react";
import "../../assets/styles/package.css";
import Packages from "../../components/packages";
import Button from "../../components/common/button";
import { useViewPlanQuery } from "../../hooks/plans/viewplan";

const PlanData = () => {
  const packagesRef = React.useRef(null);
  const location = useLocation();
  const { data: planData, isLoading, isError } = useViewPlanQuery();

  useEffect(() => {
    if (planData) {
      console.log("Plan data from API:", planData);
    }
  }, [planData]);

   if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading companies</div>;
  
  const handleAddPackage = () => {
    if (packagesRef.current) {
      packagesRef.current.openAddModal();
    }
  };

  return (
    <>
      <div className="companies-page">
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

export default PlanData;
