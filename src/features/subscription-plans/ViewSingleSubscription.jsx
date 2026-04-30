// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";
// import { useViewSingleSubscription } from "../../hooks/subscriptionPlans/viewsinglesubscription";

// const ViewSingleSubscription = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { data, isLoading, isError } = useViewSingleSubscription(id);

//   if (isLoading) return <div>Loading...</div>;
//   if (isError || !data) return <div>Error loading subscription data</div>;

//   const subscription = data.data || data; // Adjust if your API response structure is different

//   return (
//     <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
//       <button onClick={() => navigate(-1)} style={{ marginBottom: 16 }}>
//         <ArrowLeft size={18} /> Back
//       </button>
//       <h2>Subscription Details</h2>
//       <div style={{ margin: "20px 0" }}>
//         <p><strong>Plan:</strong> {subscription.plan?.name || subscription.plan || "-"}</p>
//         <p><strong>Owner Type:</strong> {subscription.ownerType || "-"}</p>
//         <p><strong>Owner ID:</strong> {subscription.ownerId || "-"}</p>
//         <p><strong>Billing Cycle:</strong> {subscription.billingCycle || "-"}</p>
//         <p><strong>Status:</strong> {subscription.status || "-"}</p>
//         <p><strong>Payment ID:</strong> {subscription.paymentId || "-"}</p>
//         <p><strong>Payment Status:</strong> {subscription.paymentStatus || "-"}</p>
//         <p><strong>Created At:</strong> {subscription.createdAt ? new Date(subscription.createdAt).toLocaleString() : "-"}</p>
//         <p><strong>Updated At:</strong> {subscription.updatedAt ? new Date(subscription.updatedAt).toLocaleString() : "-"}</p>
//       </div>
//     </div>
//   );
// };

// export default ViewSingleSubscription;
