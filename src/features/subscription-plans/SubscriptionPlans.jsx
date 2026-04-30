import React, { useEffect } from "react";
import { BellRing, BadgePlus, ShieldCheck, Shell } from "lucide-react";
import { useLocation, useParams } from "react-router-dom";
import { getPageTitle } from "../../utils/getPageTitle";
import Cards from "../../components/common/cards";
import Button from "../../components/common/button";
import Datatable from "../../components/common/datatable";
import { useViewSubscriptionPlansQuery } from "../../hooks/subscriptionPlans/subscriptionPlan";
import { useSubscriptionStore } from "../../hooks/subscriptionPlans/createSubscription";
import SubscriptionModal from "../../components/modal/subscriptionModal";
import { useViewSingleSubscription } from "../../hooks/subscriptionPlans/viewsinglesubscription";

const SubscriptionPlans = () => {
  const subscriptionMutation = useSubscriptionStore();
  const singleviewsubscription = useViewSingleSubscription();
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalMode, setModalMode] = React.useState("add"); // 'add' or 'edit'
  const location = useLocation();
  const planRef = React.useRef();

  const {
    data: singleSubscriptionData,
    isLoading: isSingleLoading,
    isError: isSingleError,
  } = useViewSingleSubscription(id);

  const singlesubscription = singleSubscriptionData?.data || {};

  console.log("Single subscription data from API:", singleSubscriptionData);

  const {
    data: subscriptionPlansData,
    isLoading,
    isError,
  } = useViewSubscriptionPlansQuery();

  useEffect(() => {
    if (subscriptionPlansData) {
      setSubscriptionPlans(
        Array.isArray(subscriptionPlansData)
          ? subscriptionPlansData
          : subscriptionPlansData.data,
      );
    }
  }, [subscriptionPlansData]);

  const [formData, setFormData] = React.useState({
    plan: "",
    ownerType: "",
    ownerId: "",
    // isTrial: "",
    billingCycle: "",
    status: "",
    paymentId: "",
    paymentStatus: "",
  });

  const [subscriptionPlans, setSubscriptionPlans] = React.useState([]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading subscription plans</div>;

  const subscription = [
    {
      id: "1",
      icon: <BellRing />,
      value: 500,
      title: "Total Subscriptions",
    },
    {
      id: "2",
      icon: <ShieldCheck />,
      value: 270,
      title: "Active Subscriptions",
    },
    {
      id: "3",
      icon: <Shell />,
      value: 6,
      title: "Trial Subscriptions",
    },
  ];

  const columns = [
    {
      key: "plan",
      label: "Plan",
      render: (plan) => (plan && plan.name ? plan.name : ""),
    },
    {
      key: "ownerType",
      label: "Owner Type",
      render: (ownerType) =>
        typeof ownerType === "object" && ownerType !== null
          ? ownerType.name || JSON.stringify(ownerType)
          : ownerType,
    },
    {
      key: "ownerId",
      label: "Owner ID",
      render: (ownerId) =>
        typeof ownerId === "object" && ownerId !== null
          ? ownerId.name || JSON.stringify(ownerId)
          : ownerId,
    },

    // { key: "isTrial", label: "Is Trial" },
    { key: "billingCycle", label: "Billing Cycle" },
    { key: "status", label: "Status" },
    { key: "paymentId", label: "Payment ID" },
    { key: "paymentStatus", label: "Payment Status" },
  ];

  // Actions for the 3-dot menu
  const actions = [{ type: "view" }, { type: "edit" }, { type: "delete" }];

  // Handler for dropdown actions
  const handleAction = ({ type, id, rowData }) => {
    if (type === "view") {
    } else if (type === "edit") {
      setModalMode("edit");
      setFormData(rowData);
      setIsModalOpen(true);
    } else if (type === "delete") {
    }
  };

  const handleAddPackage = () => {
    setModalMode("add");
    setFormData({
      plan: "",
      ownerType: "",
      ownerId: "",
      subOwnerId: "",
      // isTrial: "",
      billingCycle: "",
      status: "",
      paymentId: "",
      paymentStatus: "",
    });
    setIsModalOpen(true);
  };

  // Handler for saving a new subscription
  const handleSaveSubscription = (payload) => {
    setIsModalOpen(false);

    subscriptionMutation.mutate(payload, {
      onSuccess: (res) => {
        setSubscriptionPlans((prev) => [
          ...prev,
          res?.data || { ...payload, id: Date.now() },
        ]);
      },
    });
  };

  return (
    <>
      <div className="companies-page">
        <div className="page-header">
          <h1 className="page-title">{getPageTitle(location.pathname)}</h1>
          {/* <p style={{ color: "rgb(85, 85, 85)", fontSize: "13px" }}>
            Manage your subscription and billing
          </p> */}
        </div>
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button onClick={handleAddPackage}>
            <BadgePlus size={18} />
            Create Subscription
          </Button>
        </div>
      </div>
      <Cards cardsData={subscription} hideMenu={true}></Cards>
      <Datatable
        data={subscriptionPlans}
        columns={columns}
        actions={actions}
        onAction={handleAction}
      />
      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        mode={modalMode}
        isLoading={subscriptionMutation.isLoading}
        onSave={handleSaveSubscription}
      />
    </>
  );
};
export default SubscriptionPlans;
