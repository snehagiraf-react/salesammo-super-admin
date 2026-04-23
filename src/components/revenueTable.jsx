import React, { useState } from 'react'
import Datatable from './common/datatable';

const revenueData = [
  {
    id: 1,
    name: "TechCorp Inc.",
    customers: "52",
    revenue: "$48,500",
    total: "10%",
  },
  {
    id: 2,
    name: "Acme Ltd",
    customers: "39",
    revenue: "$89,500",
    total: "15%",
  },
  {
    id: 3,
    name: "Global Solutions",
    customers: "17",
    revenue: "$34,800",
    total: "8%",
  },
  {
    id: 4,
    name: "Innovation Labs",
    customers: "31",
    revenue: "$67,600",
    total: "12%",
  },
  {
    id: 5,
    name: "Cloud Tech Pro",
    customers: "12",
    revenue: "$28,900",
    total: "5%",
  },
  {
    id: 6,
    name: "Enterprise Hub",
    customers: "38",
    revenue: "$78,500",
    total: "18%",
  },
];


const RevenueTable = () => {

    const [revenue] = useState(revenueData);

    const columns = [
        { key: 'name', label: 'Company Name' },
        { key: 'customers', label: 'Customers' },
        { key: 'revenue', label: 'Revenue', className: 'company-revenue' },
        { key: 'total', label: '% of Total' },
      ];
    
  return (
    <>
    <Datatable
        data={revenue}
        columns={columns}
        title="Detailed Revenue Breakdown"
        />
    </>
  )
}

export default RevenueTable