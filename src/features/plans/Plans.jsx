import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPageTitle } from "../../utils/getPageTitle";
import { Plus } from "lucide-react";
import "../../assets/styles/package.css";
import Packages from "../../components/packages";
import Button from "../../components/common/button";
import { useViewPlanQuery } from "../../hooks/plans/viewplan";
import { usePlanUpdate } from "../../hooks/plans/update";
import { useRemovePlan } from "../../hooks/plans/deleteplan";
import Toggle from "../../components/common/toggle";

const PlanData = () => {
  const [plan, setPlan] = React.useState([]);
  const planRef = React.useRef();
  const location = useLocation();
  const [isYearly, setIsYearly] = React.useState(false);
  const { data: planData, isLoading, isError, refetch } = useViewPlanQuery();
  // const [openMenuId, setOpenMenuId] = React.useState(null);
  // const [editingPlanId, setEditingPlanId] = React.useState(null);
  // const [isModalOpen, setIsModalOpen] = React.useState(false);

  const planUpdateMutation = usePlanUpdate();
  const planDeleteMutation = useRemovePlan();

  const handlePlanUpdate = (id, body, params) => {
    planUpdateMutation.mutate({ id, body, params });
  };

  const handlePlanDelete = (id) => {
    planDeleteMutation.mutate(id);
  };

  // const handleEdit = (data) => {
  //   setOpenMenuId(null);
  //   setEditingPlanId(data.id);
  //   setIsModalOpen(true);
  // };

  useEffect(() => {
    if (planData) {
      setPlan(Array.isArray(planData) ? planData : planData.data);
    }
  }, [planData]);

  const handleAddPackage = () => {
    if (planRef.current) {
      planRef.current.openAddModal();
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
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Toggle
            checked={isYearly}
            onChange={(checked) => {
              setIsYearly(checked);
            }}
          />
          <span style={{ marginLeft: "8px", marginRight: "20px" }}>
            switch to yearly
          </span>
          <Button onClick={handleAddPackage}>
            <Plus size={18} />
            Add Packages
          </Button>
        </div>
      </div>

      {/* ✅ Conditional rendering starts here */}
      {isLoading && <div>Loading...</div>}

      {isError && <div>Error loading plans</div>}

      <Packages
        ref={planRef}
        data={
          !isLoading && !isError
            ? plan.filter((p) => {
                // If plan.pricing is an array, check billingCycle of first item
                if (Array.isArray(p.pricing) && p.pricing[0]) {
                  return isYearly
                    ? p.pricing[0].billingCycle === "yearly";
                }
                return false;
              })
            : []
        }
        onRefresh={refetch}
      />
    </>
  );
};

export default PlanData;
