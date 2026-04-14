import React from "react";
import "./DashboardPage.css";
import { useNavigate, useLocation } from "react-router-dom";
import RevenueLineChart from "../../components/common/revenueLineChart";
import CompanyBarChart from "../../components/common/companyBarChart";
import Cards from "../../components/common/cards";
import { getPageTitle } from "../../utils/getPageTitle";
import RecentActivity from "../../components/common/recentActivity";

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
      <h1 className="page-title">{getPageTitle(location.pathname)}</h1>
     
      <Cards />
      <div className="dashboard-content">
     
        <RevenueLineChart />
        <CompanyBarChart />
        {/* <UsersPieChart /> */}
      </div>

      <RecentActivity />
    </>
  );
}
