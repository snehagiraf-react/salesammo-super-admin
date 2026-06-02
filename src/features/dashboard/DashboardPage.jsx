import React from "react";
import "./DashboardPage.css";
import { useLocation } from "react-router-dom";
import RevenueLineChart from "../../components/common/revenueLineChart";
import CompanyBarChart from "../../components/common/companyBarChart";
import DashboardCards from "../../components/common/DashboardCards";
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

  const chartData = [
    { day: "mon", growth: 1000 },
    { day: "tue", growth: 1800 },
    { day: "wed", growth: 1200 },
    { day: "thu", growth: 2200 },
    { day: "fri", growth: 2100 },
    { day: "sat", growth: 3000 },
  ];

  // ✅ Bars configuration for company growth chart
  const bars = [
    {
      dataKey: "growth",
      color: "#5c308d", // Purple color
      name: "Growth",
    },
  ];

  return (
    <>
      <h1 className="page-title">{getPageTitle(location.pathname)}</h1>

      <DashboardCards />

      <div className="dashboard-content">
        <RevenueLineChart />
        {/* <CompanyBarChart
          title="Share Analytics"
          subtitle="Weekly share distribution"
          data={chartData}
          bars={bars}
          xKey="day"
          height={300}
          showGrid={true}
          showLegend={false}
          layout="horizontal"
        /> */}
        {/* <UsersPieChart /> */}
      </div>

      <RecentActivity />
    </>
  );
}
