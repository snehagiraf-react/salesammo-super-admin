import React, { useState } from 'react';
import Datatable from './common/datatable';

/**
 * Example: Revenue Breakdown Table with Title
 * Shows how to use the Datatable component with a title
 */

const RevenueBreakdown = () => {
  const [revenueData] = useState([
    {
      id: 1,
      name: "Global Solutions",
      customers: 52,
      revenue: "$105,400",
      percentage: "21.0%",
      status: "ACTIVE"
    },
    {
      id: 2,
      name: "Acme Ltd",
      customers: 45,
      revenue: "$91,400",
      percentage: "18.3%",
      status: "ACTIVE"
    },
    {
      id: 3,
      name: "Techcorp Inc",
      customers: 38,
      revenue: "$78,800",
      percentage: "15.7%",
      status: "ACTIVE"
    },
    {
      id: 4,
      name: "Innovation labs",
      customers: 31,
      revenue: "$67,300",
      percentage: "13.5%",
      status: "ACTIVE"
    },
    {
      id: 5,
      name: "Cloud Tech Pro",
      customers: 18,
      revenue: "$34,800",
      percentage: "6.8%",
      status: "ACTIVE"
    },
    {
      id: 6,
      name: "Enterprise Hub",
      customers: 12,
      revenue: "$29,800",
      percentage: "5.8%",
      status: "ACTIVE"
    },
    {
      id: 7,
      name: "Total",
      customers: 196,
      revenue: "$407,500",
      percentage: "100%",
      status: "TOTAL"
    }
  ]);

  const columns = [
    { key: 'name', label: 'Company Name' },
    { key: 'customers', label: 'Customers' },
    { key: 'revenue', label: 'Revenue' },
    { key: 'percentage', label: '% of Total' }
  ];

  const handleAction = (actionData) => {
    const { type, id, rowData } = actionData;
    console.log(`${type} revenue record:`, rowData);
  };

  return (
    <Datatable
      title="Detailed Revenue Breakdown"
      data={revenueData}
      columns={columns}
      onAction={handleAction}
    />
  );
};

export default RevenueBreakdown;
