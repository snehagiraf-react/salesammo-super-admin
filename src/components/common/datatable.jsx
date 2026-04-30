import React from 'react';
import { Eye, Edit, Trash2, EllipsisVertical } from 'lucide-react';
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

  console.log('Datatable received data:', data);
  
  // Render cell value
  const renderCellValue = (row, column) => {
    if (column.render) {
      return column.render(row[column.key], row);
    }
    
    // Handle status badge styling with multiple colors
    if (column.key === 'status') {
      const statusValue = String(row[column.key] || '').toLowerCase();
      let statusClass = '';
      switch (statusValue) {
        case 'active':
          statusClass = 'status-active';
          break;
        case 'draft':
          statusClass = 'status-draft';
          break;
        case 'pending':
          statusClass = 'status-pending';
          break;
        case 'expired':
          statusClass = 'status-expired';
          break;
        case 'disabled':
          statusClass = 'status-disabled';
          break;
        case 'trial':
          statusClass = 'status-trial';
          break;
        default:
          statusClass = 'status-default';
      }
      return (
        <span className={`status-badge ${statusClass}`}>
          {row[column.key]}
        </span>
      );
    }
    
    return row[column.key];
  };

  // ActionsDropdown as a component to use hooks properly
  const ActionsDropdown = ({ row }) => {
    const iconProps = { size: 18 };
    const options = actions
      .filter(action => ['view', 'edit', 'delete'].includes(action.type))
      .map(action => {
        let label, icon;
        switch (action.type) {
          case 'view':
            label = 'View';
            icon = <Eye {...iconProps} />;
            break;
          case 'edit':
            label = 'Edit';
            icon = <Edit {...iconProps} />;
            break;
          case 'delete':
            label = 'Delete';
            icon = <Trash2 {...iconProps} />;
            break;
          default:
            label = action.type;
            icon = null;
        }
        return {
          value: action.type,
          label: (
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {icon} {label}
            </span>
          )
        };
      });

    const [open, setOpen] = React.useState(false);
    const ref = React.useRef();
    React.useEffect(() => {
      const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (options.length === 0) return null;

    const handleAction = (type) => {
      onAction?.({ type, id: row.id, rowData: row });
    };

    return (
      <div className="dropdown" ref={ref}>
        <button className="action-icon-btn" title="Actions" onClick={() => setOpen(!open)}>
          <EllipsisVertical size={20} />
        </button>
        {open && (
          <div className="dropdown-menu">
            {options.map(opt => (
              <div
                key={opt.value}
                className="dropdown-item"
                onClick={() => {
                  handleAction(opt.value);
                  setOpen(false);
                }}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
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
                      <ActionsDropdown row={row} />
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