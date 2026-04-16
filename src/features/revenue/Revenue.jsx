import React from "react";
import Cards from "../../components/common/cards";
import RevenueLineChart from "../..//components/common/revenueLineChart";
import CompanyBarChart from "../../components/common/companyBarChart";

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
      dotColor: "#5C308D",
    },
  ];

  const companyData = [
    { name: "Global solutions", value: 110000 },
    { name: "Acme Ltd", value: 95000 },
    { name: "Techcorp Inc", value: 78000 },
    { name: "Innovation labs", value: 65000 },
    { name: "Cloud Tech Pro", value: 55000 },
    { name: "Enterprise Hub", value: 42000 },
  ];

  return (
    <>
      <Cards cardsData={revenueCardsData} />

      <div style={{ marginTop: '30px' }}>
        <RevenueLineChart
          data={revenueData}
          title="Monthly Revenue Trend"
          subtitle=""
          lines={revenueLines}
        />
      </div>

      <div style={{ marginTop: '20px', width: '100%' }}>
        <CompanyBarChart
          data={companyData}
          title="Revenue by Company"
          subtitle=""
          layout="horizontal" // 🔥 NEW PROP
        />
      </div>
    </>
  );
};

export default Revenue;
