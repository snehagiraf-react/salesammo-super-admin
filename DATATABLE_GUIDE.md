# Reusable Datatable Component - Documentation

## Overview

A flexible, reusable React table component that can be used across different pages with different columns and data structures. This component eliminates code duplication and provides a consistent UI for displaying tabular data.

## Files

- **`src/components/common/datatable.jsx`** - The reusable Datatable component
- **`src/components/companyData.jsx`** - Updated to use the new Datatable component
- **`src/components/PackagesTable.jsx`** - Example: Packages displayed as a table
- **`src/components/TableUsageExamples.jsx`** - Multiple usage examples and patterns

## Component Props

### `data` (Array) - **Required**
The array of objects to display in the table.

```javascript
const data = [
  { id: 1, name: "John", email: "john@example.com", status: "ACTIVE" },
  { id: 2, name: "Jane", email: "jane@example.com", status: "ACTIVE" }
];
```

### `columns` (Array) - **Required**
Configuration for table columns. Each column object should have:

- **`key`** (string) - Property name from the data object
- **`label`** (string) - Header title
- **`render`** (function, optional) - Custom render function
- **`className`** (string, optional) - CSS class for custom styling

```javascript
const columns = [
  { 
    key: "name", 
    label: "Full Name", 
    className: "name-column" 
  },
  { 
    key: "email", 
    label: "Email Address" 
  },
  {
    key: "createdDate",
    label: "Join Date",
    render: (value, row) => new Date(value).toLocaleDateString()
  },
  { 
    key: "status", 
    label: "Status" // Status automatically gets styled badges
  }
];
```

### `actions` (Array) - **Optional**
Available action types:

- **`view`** - View icon button
- **`edit`** - Edit icon button
- **`delete`** - Delete icon button
- **`disable`** - Disable/Enable toggle button (based on status field)

```javascript
const actions = [
  { type: "view" },
  { type: "edit" },
  { type: "delete" }
];
```

### `onAction` (Function) - **Optional** (Required if actions are used)
Callback function triggered when an action button is clicked.

Receives an object with:
- **`type`** - Action type (view, edit, delete, disable, enable)
- **`id`** - Row ID
- **`rowData`** - Complete row object

```javascript
const handleAction = (actionData) => {
  const { type, id, rowData } = actionData;
  
  if (type === "view") {
    console.log("View row:", rowData);
  } else if (type === "edit") {
    console.log("Edit row:", rowData);
  } else if (type === "delete") {
    console.log("Delete row:", rowData);
  }
};
```

### `className` (String) - **Optional**
Additional CSS class for the table container.

## Usage Examples

### Example 1: Basic Company Table (Updated)

```javascript
import React, { useState } from 'react';
import Datatable from './common/datatable';

const CompanyData = () => {
  const [companies] = useState([
    { id: 1, name: "TechCorp", email: "contact@techcorp.com", users: 26, revenue: "$48,500", status: "ACTIVE" },
    { id: 2, name: "Acme Ltd", email: "info@acme.com", users: 39, revenue: "$89,500", status: "ACTIVE" }
  ]);

  const columns = [
    { key: 'name', label: 'Company Name' },
    { key: 'email', label: 'Email' },
    { key: 'users', label: 'Users' },
    { key: 'revenue', label: 'Revenue' },
    { key: 'status', label: 'Status' }
  ];

  const actions = [
    { type: 'view' },
    { type: 'disable' }
  ];

  const handleAction = (actionData) => {
    const { type, id, rowData } = actionData;
    if (type === 'view') {
      console.log('View company:', rowData);
    } else if (type === 'disable' || type === 'enable') {
      console.log('Toggle status:', rowData);
    }
  };

  return (
    <Datatable
      data={companies}
      columns={columns}
      actions={actions}
      onAction={handleAction}
    />
  );
};

export default CompanyData;
```

### Example 2: Packages Table

```javascript
import React, { useState } from 'react';
import Datatable from './common/datatable';

const PackagesTable = () => {
  const [packages] = useState([
    { id: 1, plan: "Starter", price: "$29", users: "10", features: 5, status: "ACTIVE" },
    { id: 2, plan: "Professional", price: "$99", users: "50", features: 15, status: "ACTIVE" }
  ]);

  const columns = [
    { key: 'plan', label: 'Package Name' },
    { key: 'price', label: 'Price' },
    { key: 'users', label: 'Max Users' },
    { key: 'features', label: 'Features Included' },
    { key: 'status', label: 'Status' }
  ];

  const actions = [
    { type: 'view' },
    { type: 'edit' },
    { type: 'delete' }
  ];

  const handleAction = (actionData) => {
    const { type, id, rowData } = actionData;
    console.log(`${type} package:`, rowData);
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

export default PackagesTable;
```

### Example 3: Table with Custom Column Rendering

```javascript
const UserTable = () => {
  const [users] = useState([
    { id: 1, name: "John", email: "john@ex.com", joinDate: "2024-01-15", status: "ACTIVE" },
    { id: 2, name: "Jane", email: "jane@ex.com", joinDate: "2024-02-10", status: "DISABLE" }
  ]);

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    {
      key: 'joinDate',
      label: 'Join Date',
      render: (value) => new Date(value).toLocaleDateString()
    },
    { key: 'status', label: 'Status' }
  ];

  const actions = [
    { type: 'view' },
    { type: 'edit' }
  ];

  return (
    <Datatable
      data={users}
      columns={columns}
      actions={actions}
      onAction={handleAction}
    />
  );
};
```

### Example 4: Table with Conditional Column Content

```javascript
const ProductTable = () => {
  const [products] = useState([
    { id: 1, name: "Product A", stock: 150, status: "ACTIVE" },
    { id: 2, name: "Product B", stock: 0, status: "DISABLE" }
  ]);

  const columns = [
    { key: 'name', label: 'Product' },
    {
      key: 'stock',
      label: 'Stock',
      render: (value, row) => (
        <span style={{ color: value === 0 ? 'red' : 'green' }}>
          {value > 0 ? `${value} units` : 'Out of Stock'}
        </span>
      )
    },
    { key: 'status', label: 'Status' }
  ];

  return (
    <Datatable
      data={products}
      columns={columns}
      actions={[{ type: 'edit' }, { type: 'delete' }]}
      onAction={handleAction}
    />
  );
};
```

## Key Features

✅ **Reusable** - Use across different pages without duplication  
✅ **Flexible** - Choose which columns to display and how to render them  
✅ **Customizable** - Custom render functions for special column content  
✅ **Action-Ready** - Built-in action buttons (view, edit, delete, enable/disable)  
✅ **Status Styling** - Automatic badge styling for status columns  
✅ **Icon Support** - Uses lucide-react icons for consistent UI  
✅ **Empty State** - Handles empty data gracefully  

## Status Styling

The component automatically detects the `status` key and applies appropriate styling:

- **ACTIVE** status gets `status-active` class (green badge)
- **DISABLE** status gets `status-draft` class (gray badge)

```javascript
// Your data
{ id: 1, name: "Item", status: "ACTIVE" }

// Renders with automatic badge styling
<span className="status-badge status-active">ACTIVE</span>
```

## CSS Classes Used

Make sure these classes are defined in your CSS files:

- `.table-container` - Container wrapper
- `.user-table` - Main table element
- `.status-badge` - Status badge wrapper
- `.status-active` - Active status styling
- `.status-draft` - Disable/inactive status styling
- `.actions-container` - Actions cell wrapper
- `.action-icon-btn` - Icon button styling
- `.action-btn` - Action button styling
- `.action-btn-disable` - Disable button styling
- `.action-btn-enable` - Enable button styling
- `.action-edit` - Edit action styling
- `.action-delete` - Delete action styling

## Integration Steps

1. **Import the component:**
   ```javascript
   import Datatable from './components/common/datatable';
   ```

2. **Define your data:**
   ```javascript
   const [data] = useState([...]);
   ```

3. **Configure columns:**
   ```javascript
   const columns = [
     { key: 'name', label: 'Name' },
     { key: 'email', label: 'Email' }
   ];
   ```

4. **Define actions (optional):**
   ```javascript
   const actions = [
     { type: 'view' },
     { type: 'edit' },
     { type: 'delete' }
   ];
   ```

5. **Handle action callbacks (optional):**
   ```javascript
   const handleAction = (actionData) => {
     const { type, id, rowData } = actionData;
     // Handle actions here
   };
   ```

6. **Render the component:**
   ```javascript
   <Datatable
     data={data}
     columns={columns}
     actions={actions}
     onAction={handleAction}
   />
   ```

## Migration Guide

If you have existing table components, follow these steps to migrate:

### Before (Hardcoded Table)
```javascript
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      {/* More columns... */}
    </tr>
  </thead>
  <tbody>
    {items.map(item => (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.email}</td>
        {/* More cells... */}
      </tr>
    ))}
  </tbody>
</table>
```

### After (Using Datatable)
```javascript
const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' }
];

const actions = [{ type: 'view' }, { type: 'edit' }];

<Datatable
  data={items}
  columns={columns}
  actions={actions}
  onAction={handleAction}
/>
```

## Tips & Best Practices

1. **Always provide unique IDs** - Each row should have an `id` property
2. **Use consistent column keys** - Match data property names exactly
3. **Custom rendering** - Use the `render` function for complex content
4. **Status field** - Include a `status` field for automatic badge styling
5. **Action callbacks** - Always handle the action type in your callback
6. **Data management** - Pass state down, handle updates in parent component

## Support for Different Page Types

You can use this component for:
- Companies/Organizations management
- Products/Services listings
- User management
- Package/Subscription plans
- Orders/Transactions
- Any tabular data
- ... and many more!

Just adjust the columns and actions based on your needs!
