import React from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import '../../assets/styles/table.css';

/**
 * Reusable Datatable Component
 * 
 * @param {Array} data - Array of objects to display in the table
 * @param {Array} columns - Array of column configurations
 *   Each column object should have:
 *   - key: string (property name from data object)
 *   - label: string (header title)
 *   - render: function (optional, custom render function)
 *   - className: string (optional, for custom styling)
 * @param {Array} actions - Array of action buttons (view, edit, delete, disable, enable)
 * @param {Function} onAction - Callback function when action is clicked
 *   Receives: { type: string, id: any, rowData: object }
 * @param {String} title - Optional table title displayed above the table
 * @param {String} className - Optional CSS class for the container
 */
const Datatable = ({ 
  data = [], 
  columns = [], 
  actions = [], 
  onAction = null,
  title = null,
  className = ''
}) => {
  
  // Default columns if none provided
  const defaultColumns = columns.length > 0 ? columns : [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' }
  ];

  // Render cell value
  const renderCellValue = (row, column) => {
    if (column.render) {
      return column.render(row[column.key], row);
    }
    
    // Handle status badge styling
    if (column.key === 'status') {
      const statusClass = row[column.key] === 'ACTIVE' ? 'status-active' : 'status-draft';
      return (
        <span className={`status-badge ${statusClass}`}>
          {row[column.key]}
        </span>
      );
    }
    
    return row[column.key];
  };

  // Render action button
  const renderActionButton = (action, row) => {
    const iconProps = { size: 18 };
    
    switch(action.type) {
      case 'view':
        return (
          <button 
            className="action-icon-btn" 
            title="View"
            onClick={() => onAction?.({ type: 'view', id: row.id, rowData: row })}
          >
            <Eye {...iconProps} />
          </button>
        );
      
      case 'edit':
        return (
          <button 
            className="action-icon-btn action-edit" 
            title="Edit"
            onClick={() => onAction?.({ type: 'edit', id: row.id, rowData: row })}
          >
            <Edit {...iconProps} />
          </button>
        );
      
      case 'delete':
        return (
          <button 
            className="action-icon-btn action-delete" 
            title="Delete"
            onClick={() => onAction?.({ type: 'delete', id: row.id, rowData: row })}
          >
            <Trash2 {...iconProps} />
          </button>
        );
      
      case 'disable':
      case 'enable':
        const isActive = row.status === 'ACTIVE';
        const buttonText = isActive ? 'DISABLE' : 'ENABLE';
        const buttonClass = isActive ? 'action-btn-disable' : 'action-btn-enable';
        const actionType = isActive ? 'disable' : 'enable';
        
        return (
          <button 
            className={`action-btn ${buttonClass}`}
            onClick={() => onAction?.({ type: actionType, id: row.id, rowData: row })}
          >
            {buttonText}
          </button>
        );
      
      default:
        return null;
    }
  };

  if (data.length === 0) {
    return (
      <div className={`table-container ${className}`}>
        {title && <h3 className="table-title">{title}</h3>}
        <p className="no-data">No data available</p>
      </div>
    );
  }

  return (
    <div className={`table-container ${className}`}>
      {title && <h3 className="table-title">{title}</h3>}
      <div className="table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              {defaultColumns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
              {actions.length > 0 && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={row.id || index}>
                {defaultColumns.map((column) => (
                  <td 
                    key={`${row.id || index}-${column.key}`}
                    className={column.className}
                  >
                    {renderCellValue(row, column)}
                  </td>
                ))}
                {actions.length > 0 && (
                  <td>
                    <div className="actions-container">
                      {actions.map((action, actionIndex) => (
                        <React.Fragment key={actionIndex}>
                          {renderActionButton(action, row)}
                        </React.Fragment>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Datatable;