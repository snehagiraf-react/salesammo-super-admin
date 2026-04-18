/**
 * TABLE USAGE EXAMPLES
 * 
 * This file demonstrates how to use the reusable Datatable component
 * across different pages with different columns and data structures.
 */

import Datatable from './common/datatable';

// ============================================
// EXAMPLE 1: COMPANY DATA TABLE
// ============================================

export const CompanyTableExample = () => {
  const companyData = [
    { id: 1, name: "TechCorp Inc.", email: "contact@techcorp.com", users: 26, revenue: "$48,500", status: "ACTIVE" },
    { id: 2, name: "Acme Ltd", email: "info@acme.com", users: 39, revenue: "$89,500", status: "ACTIVE" },
  ];

  const columns = [
    { key: 'name', label: 'Company Name', className: 'company-name' },
    { key: 'email', label: 'Email', className: 'company-email' },
    { key: 'users', label: 'Users', className: 'company-users' },
    { key: 'revenue', label: 'Revenue', className: 'company-revenue' },
    { key: 'status', label: 'Status' },
  ];

  const actions = [
    { type: 'view' },
    { type: 'disable' }
  ];

  const handleAction = (actionData) => {
    const { type, id, rowData } = actionData;
    console.log(`Action: ${type}, Company ID: ${id}`, rowData);
  };

  return (
    <Datatable
      data={companyData}
      columns={columns}
      actions={actions}
      onAction={handleAction}
    />
  );
};

// ============================================
// EXAMPLE 2: PACKAGES TABLE
// ============================================

export const PackageTableExample = () => {
  const packageData = [
    { id: 1, name: "Starter", price: "$99", features: 5, users: 10, status: "ACTIVE" },
    { id: 2, name: "Professional", price: "$299", features: 15, users: 50, status: "ACTIVE" },
    { id: 3, name: "Enterprise", price: "$999", features: 30, users: "Unlimited", status: "ACTIVE" },
  ];

  const columns = [
    { key: 'name', label: 'Package Name' },
    { key: 'price', label: 'Price' },
    { key: 'features', label: 'Features' },
    { key: 'users', label: 'Max Users' },
    { key: 'status', label: 'Status' },
  ];

  const actions = [
    { type: 'view' },
    { type: 'edit' },
    { type: 'delete' }
  ];

  const handleAction = (actionData) => {
    const { type, id, rowData } = actionData;
    console.log(`Action: ${type}, Package ID: ${id}`, rowData);
  };

  return (
    <Datatable
      data={packageData}
      columns={columns}
      actions={actions}
      onAction={handleAction}
    />
  );
};

// ============================================
// EXAMPLE 3: USER TABLE WITH CUSTOM RENDER
// ============================================

export const UserTableExample = () => {
  const userData = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", joinDate: "2024-01-15", status: "ACTIVE" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", joinDate: "2024-02-10", status: "ACTIVE" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", joinDate: "2024-01-20", status: "DISABLE" },
  ];

  const columns = [
    { key: 'name', label: 'User Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    {
      key: 'joinDate',
      label: 'Join Date',
      render: (value) => new Date(value).toLocaleDateString() // Custom date formatting
    },
    { key: 'status', label: 'Status' },
  ];

  const actions = [
    { type: 'view' },
    { type: 'edit' },
    { type: 'disable' }
  ];

  const handleAction = (actionData) => {
    const { type, id, rowData } = actionData;
    console.log(`Action: ${type}, User ID: ${id}`, rowData);
  };

  return (
    <Datatable
      data={userData}
      columns={columns}
      actions={actions}
      onAction={handleAction}
    />
  );
};

// ============================================
// EXAMPLE 4: PRODUCTS TABLE
// ============================================

export const ProductTableExample = () => {
  const productData = [
    { id: 1, name: "Product A", category: "Electronics", price: "$99.99", stock: 150, status: "ACTIVE" },
    { id: 2, name: "Product B", category: "Clothing", price: "$49.99", stock: 0, status: "DISABLE" },
    { id: 3, name: "Product C", category: "Electronics", price: "$199.99", stock: 75, status: "ACTIVE" },
  ];

  const columns = [
    { key: 'name', label: 'Product Name' },
    { key: 'category', label: 'Category' },
    { key: 'price', label: 'Price' },
    {
      key: 'stock',
      label: 'Stock',
      render: (value) => (
        <span style={{ color: value === 0 ? 'red' : 'green' }}>
          {value > 0 ? value : 'Out of Stock'}
        </span>
      )
    },
    { key: 'status', label: 'Status' },
  ];

  const actions = [
    { type: 'view' },
    { type: 'edit' },
    { type: 'delete' }
  ];

  const handleAction = (actionData) => {
    const { type, id, rowData } = actionData;
    console.log(`Action: ${type}, Product ID: ${id}`, rowData);
  };

  return (
    <Datatable
      data={productData}
      columns={columns}
      actions={actions}
      onAction={handleAction}
    />
  );
};

// ============================================
// HOW TO USE IN YOUR PAGES:
// ============================================

/*
// In your Packages.jsx page:

import Datatable from '../common/datatable';

const Packages = () => {
  const [packages] = useState([...your package data...]);

  const columns = [
    { key: 'name', label: 'Package Name' },
    { key: 'price', label: 'Price' },
    { key: 'features', label: 'Features' },
    { key: 'users', label: 'Max Users' },
    { key: 'status', label: 'Status' },
  ];

  const actions = [
    { type: 'view' },
    { type: 'edit' },
    { type: 'delete' }
  ];

  const handleAction = (actionData) => {
    const { type, id, rowData } = actionData;
    // Handle different action types
    if (type === 'view') {
      // Handle view
    } else if (type === 'edit') {
      // Handle edit
    } else if (type === 'delete') {
      // Handle delete
    }
  };

  return (
    <Datatable
      data={packages}
      columns={columns}
      actions={actions}
      onAction={handleAction}
    />
  );
};

export default Packages;
*/

// ============================================
// DATATABLE PROPS REFERENCE:
// ============================================

/*
Props:
------
1. data (Array) - Required
   Array of objects to display in the table
   Example: [{ id: 1, name: 'John', email: 'john@example.com' }]

2. columns (Array) - Required
   Configuration for table columns
   Each column object:
   - key: string (property name from data object)
   - label: string (header title)
   - render: function(value, row) (optional, for custom rendering)
   - className: string (optional, for custom CSS class)
   
   Example:
   [
     { key: 'name', label: 'Name', className: 'name-col' },
     { 
       key: 'date', 
       label: 'Date', 
       render: (value) => new Date(value).toLocaleDateString() 
     }
   ]

3. actions (Array) - Optional
   Available action types: 'view', 'edit', 'delete', 'disable', 'enable'
   Example: [{ type: 'view' }, { type: 'edit' }, { type: 'delete' }]

4. onAction (Function) - Optional (Required if actions are used)
   Callback function when action is clicked
   Receives: { type: string, id: any, rowData: object }
   
   Example:
   const handleAction = (actionData) => {
     const { type, id, rowData } = actionData;
     console.log(`${type} clicked on row with id ${id}`);
   };

5. className (String) - Optional
   Additional CSS class for the table container
*/
