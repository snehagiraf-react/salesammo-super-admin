import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./DashboardPage.css";
// import UserActivityChart from "../../components/common/activeUserLineChart";
// import ShareAnalyticsChart from "../../components/common/analyticsBarChart";
// import Cards from "../../components/common/cards";
import { getPageTitle } from "../../utils/getPageTitle";
// import RecentActivity from "../../components/common/recentActivity";

export default function DashboardPage() {
  const location = useLocation();
  //   const navigate = useNavigate();
  //   const handleLogout = () => {
  //     localStorage.removeItem('token');
  //     localStorage.removeItem('user');
  //     navigate('/login');
  //   };

  return (
    <>
      {/* <h1 className="page-title">{getPageTitle(location.pathname)}</h1> */}
      <p style={{ color: "rgb(85, 85, 85)", fontSize: "13px" }}>
        Welcome back! Here’s what’s happening with your platform
      </p>
      {/* <Cards /> */}
      <div className="dashboard-content">
     
        {/* <UserActivityChart />
        <ShareAnalyticsChart /> */}
        {/* <UsersPieChart /> */}
      </div>

      {/* <RecentActivity /> */}
    </>
  );
}
