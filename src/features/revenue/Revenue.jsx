import React from "react";
import RevenueCards from "../../components/common/RevenueCards";
import RevenueLineChart from "../../components/common/revenueLineChart";
import CompanyBarChart from "../../components/common/companyBarChart";
import RevenueTable from "../../components/revenueTable";
const Revenue = () => {
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
      <RevenueCards />

      <div style={{ marginTop: "30px" }}>
        <RevenueLineChart />
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

      <RevenueTable />
    </>
  );
};

export default Revenue;