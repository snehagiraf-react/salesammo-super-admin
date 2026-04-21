import React from "react";
import Cards from "../../components/common/cards";
import RevenueLineChart from "../..//components/common/revenueLineChart";
import CompanyBarChart from "../../components/common/companyBarChart";
import RevenueTable from "../../components/revenueTable";

const Revenue = () => {
  const revenueCardsData = [
    {
      title: "Total Revenue",
      value: "$571.0k",
      trend: "+24.3%",
    },
    {
      title: "Total Customers",
      value: "241",
    },
    {
      title: "Avg Revenue per Company",
      value: "$62.6k",
    },
  ];

  // ✅ ADD THIS
  const revenueData = [
    { name: "Jan", value: 55000 },
    { name: "Feb", value: 48000 },
    { name: "Mar", value: 42000 },
    { name: "Apr", value: 37000 },
    { name: "May", value: 35000 },
    { name: "Jun", value: 38000 },
    { name: "Jul", value: 43000 },
    { name: "Aug", value: 50000 },
    { name: "Sep", value: 60000 },
    { name: "Oct", value: 72000 },
    { name: "Nov", value: 85000 },
    { name: "Dec", value: 98000 },
  ];

  // ✅ ADD THIS
  const revenueLines = [
    {
      dataKey: "value",
      name: "Revenue",
      stroke: "#5C308D",
      dotColor: "#ffffff",
    },
  ];

  const chartData = [
    { company: "Global solutions", revenue: 110000 },
    { company: "Acme Ltd", revenue: 95000 },
    { company: "Techcorp Inc", revenue: 78000 },
    { company: "Innovation labs", revenue: 67000 },
    { company: "Cloud Tech Pro", revenue: 55000 },
    { company: "Enterprise Hub", revenue: 42000 },
  ];

  // ✅ Bars configuration for revenue by company chart
  const bars = [
    {
      dataKey: "revenue",
      color: "#5c308d", // Purple color
      name: "Revenue",
    },
  ];

  return (
    <>
      <Cards cardsData={revenueCardsData} />

      <div style={{ marginTop: "30px" }}>
        <RevenueLineChart
          data={revenueData}
          title="Monthly Revenue Trend"
          subtitle=""
          lines={revenueLines}
        />
      </div>

      <div style={{ marginTop: "30px" }}>
        <CompanyBarChart
          title="Revenue by Company"
          subtitle=""
          data={chartData}
          bars={bars}
          xKey="company"
          height={300}
          showGrid={true}
          showLegend={false}
          layout="vertical" // ✅ Horizontal bars (companies on Y-axis)
        />
      </div>

      <Revenue Table />
    </>
  );
};

export default Revenue;