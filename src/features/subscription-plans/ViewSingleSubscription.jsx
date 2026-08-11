import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useViewSingleSubscription } from "../../hooks/subscriptionPlans/viewsinglesubscription";
import { resolveBillingCycle } from "../../utils/resolveBillingCycle";
import { getPlanLabel } from "../../utils/planLabel";

const ViewSingleSubscription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useViewSingleSubscription(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Error loading subscription data</div>;

  const subscription = data.data || data;
  const owner =
    typeof subscription.ownerId === "object" && subscription.ownerId !== null
      ? subscription.ownerId.name ||
        subscription.ownerId.email ||
        subscription.ownerId._id
      : subscription.ownerId;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: 16 }}>
        <ArrowLeft size={18} /> Back
      </button>
      <h2>Subscription Details</h2>
      <div style={{ margin: "20px 0" }}>
        <p>
          <strong>Plan:</strong> {getPlanLabel(subscription.plan) || "—"}
        </p>
        <p>
          <strong>Owner Type:</strong> {subscription.ownerType || "-"}
        </p>
        <p>
          <strong>Owner:</strong> {owner || "-"}
        </p>
        <p>
          <strong>Billing Cycle:</strong>{" "}
          {resolveBillingCycle(subscription) || "-"}
        </p>
        <p>
          <strong>Status:</strong> {subscription.status || "-"}
        </p>
        <p>
          <strong>Payment Status:</strong> {subscription.paymentStatus || "-"}
        </p>
        <p>
          <strong>Start Date:</strong>{" "}
          {subscription.startDate
            ? new Date(subscription.startDate).toLocaleString()
            : "-"}
        </p>
        <p>
          <strong>End Date:</strong>{" "}
          {subscription.endDate
            ? new Date(subscription.endDate).toLocaleString()
            : "-"}
        </p>
        <p>
          <strong>Trial End Date:</strong>{" "}
          {subscription.trialEndDate
            ? new Date(subscription.trialEndDate).toLocaleString()
            : "-"}
        </p>
      </div>
    </div>
  );
};

export default ViewSingleSubscription;
