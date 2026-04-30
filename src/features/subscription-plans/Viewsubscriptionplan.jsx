// import React from "react";
// import { useNavigate, useParams } from "react-router-dom";

// import { ArrowLeft, Mail, MapPin, Phone, Globe } from "lucide-react";
// import "../../assets/styles/company.css";
// // import { companies } from "../../features/company/Companies";
// // import { useViewCompanyQuery } from "../../hooks/company/viewCompany";
// import RecentActivity from "../../components/common/recentActivity";
// import { useViewSingleCompany } from "../../hooks/company/viewSinglepage";

// // Remove default data and use API data only

// const ViewCompanies = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   // Fetch company details by ID
//   const { data: companyData, isLoading, isError } = useViewSingleCompany(id);

//   const company = companyData?.data || {}; // Assuming API response has a 'data' property with company details

//   console.log("Single company data from API:", companyData);

//   // If your API returns subscription/activity as part of companyData, extract them here
//   const subscription = companyData?.subscription || {};
//   // const activities = companyData?.activities || [];

//   if (isLoading) return <div>Loading...</div>;
//   if (isError || !companyData) return <div>Error loading company data</div>;

//   const statusClass =
//     companyData.status === "ACTIVE" ? "status-active" : "status-draft";


  
//   return (
//     <>
//       <h5>
//         <button className="back-btn" onClick={() => navigate(-1)}>
//           <ArrowLeft size={18} /> Back to Companies
//         </button>
//       </h5>
//       <div className="company-section">
//         <div className="company-card-full">
//           {/* Top Section */}
//           <div className="company-header">
//             <div className="avatar">
//               {company.name?.substring(0, 2).toUpperCase()}
//             </div>
//             <div className="company-main">
//               <div className="title-row">
//                 <h2>{company.name}</h2>
//                 <span className={`status-badge ${statusClass}`}>
//                   {company.status}
//                 </span>
//               </div>
//               <p className="subs-sect">{company.year || ""}</p>
//             </div>
//           </div>
//           {/* Bottom Info Section */}
//           <div className="company-details">
//             <div className="detail-item">
//               <div className="icon-box">
//                 <Mail size={30} />
//               </div>
//               <div>
//                 <p className="label">Email</p>
//                 <p>{company.email}</p>
//               </div>
//             </div>
//             <div className="detail-item">
//               <div className="icon-box">
//                 <MapPin size={30} />
//               </div>
//               <div>
//                 <p className="label">Country</p>
//                 <p>{company.country}</p>
//               </div>
//             </div>
//             <div className="detail-item">
//               <div className="icon-box">
//                 <Phone size={30} />
//               </div>
//               <div>
//                 <p className="label">Phone</p>
//                 <p>{company.phoneNumber}</p>
//               </div>
//             </div>
//             <div className="detail-item">
//               <div className="icon-box">
//                 <Globe size={30} />
//               </div>
//               <div>
//                 <p className="label">Website</p>
//                 <p>{company.websiteUrl}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="company-card-full">
//           <h2>Subscription</h2>
//           <div>
//             <div style={{ margin: "20px 0" }}>
//               <p className="label">Plan</p>
//               <p className="subData">{subscription.plan || "-"}</p>
//             </div>
//             <div style={{ margin: "20px 0" }}>
//               <p className="label">Expiry Date</p>
//               <p className="subData-Date">{subscription.expiry || "-"}</p>
//             </div>
//             <hr className="divider" />
//             <div style={{ margin: "20px 0" }}>
//               <p className="label">Total Users</p>
//               <p className="subData-Date">{subscription.users || "-"}</p>
//             </div>
//             <div style={{ margin: "20px 0" }}>
//               <p className="label">Revenue</p>
//               <p className="subData">{subscription.revenue || "-"}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ViewCompanies;
