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


   const revenueData = [
    { name: "Jan", revenue: 1000 },
    { name: "Feb", revenue: 2000 },
    { name: "Mar", revenue: 3500 },
    { name: "Apr", revenue: 3800 },
    { name: "May", revenue: 4500 },
    { name: "Jun", revenue: 5900 },
    { name: "Jul", revenue: 6400 },
    { name: "Aug", revenue: 7200 },
    { name: "Sep", revenue: 8100 },
    { name: "Oct", revenue: 9200 },
    { name: "Nov", revenue: 9500 },
    { name: "Dec", revenue: 9800 },
  ];

  // ✅ ADD THIS
  const revenueLines = [
    {
      dataKey: "revenue",
      name: "Revenue",
      stroke: "#5C308D",
      dotColor: "#ffffff",
    },
  ];


  const chartData = [
    { day: "mon", growth: 1000},
    { day: "tue", growth: 1800 },
    { day: "wed", growth: 1200 },
    { day: "thu", growth: 2200 },
    { day: "fri", growth: 2100 },
    { day: "sat", growth: 3000 }
  ];

  // ✅ Bars configuration for company growth chart
  const bars = [
    {
      dataKey: "growth",
      color: "#5c308d",  // Purple color
      name: "Growth"
    }
  ];

  return (
    <>
      <h1 className="page-title">{getPageTitle(location.pathname)}</h1>
     
      <Cards />
      <div className="dashboard-content">
     
        <RevenueLineChart 
          data={revenueData}
          title="Revenue Growth"
          subtitle="Monthly revenue trends overview"
          lines={revenueLines}
        />


       <CompanyBarChart
      title="Share Analytics"
      subtitle="Weekly share distribution"
      data={chartData}
      bars={bars}
      xKey="day"
      height={300}
      showGrid={true}
      showLegend={false}
      layout="horizontal"
    />
        {/* <UsersPieChart /> */}
      </div>

      <RecentActivity />
    </>
  );
}
