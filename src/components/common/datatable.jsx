import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Eye, Edit, Trash2, Ban, CheckCircle, EllipsisVertical } from "lucide-react";
import "../../assets/styles/table.css";
import "../../assets/styles/dropdown.css";

const ACTION_META = {
  view: { label: "View", icon: Eye },
  edit: { label: "Edit", icon: Edit },
  delete: { label: "Delete", icon: Trash2 },
  disable: { label: "Disable", icon: Ban },
  enable: { label: "Enable", icon: CheckCircle },
};

const MENU_ESTIMATED_HEIGHT = 160;
const MENU_GAP = 6;

const getRowId = (row) => row?._id || row?.id;

const ActionsDropdown = ({ row, actions = [], onAction }) => {
  const [open, setOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState({});
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  const updateMenuPosition = () => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUpward = spaceBelow < MENU_ESTIMATED_HEIGHT && rect.top > spaceBelow;

    setMenuStyle({
      position: "fixed",
      top: openUpward ? undefined : rect.bottom + MENU_GAP,
      bottom: openUpward
        ? window.innerHeight - rect.top + MENU_GAP
        : undefined,
      left: Math.max(8, rect.right - 140),
      minWidth: 140,
      zIndex: 10000,
    });
  };

  useLayoutEffect(() => {
    if (!open) return;
    updateMenuPosition();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e) => {
      const inTrigger = triggerRef.current?.contains(e.target);
      const inMenu = menuRef.current?.contains(e.target);
      if (!inTrigger && !inMenu) setOpen(false);
    };

    const handleReposition = () => updateMenuPosition();

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleReposition);
    window.addEventListener("scroll", handleReposition, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleReposition);
      window.removeEventListener("scroll", handleReposition, true);
    };
  }, [open]);

  const options = (actions || [])
    .map((action) => {
      const meta = ACTION_META[action.type];
      if (!meta) return null;
      const Icon = meta.icon;
      return {
        value: action.type,
        label: meta.label,
        icon: <Icon size={16} />,
      };
    })
    .filter(Boolean);

  if (options.length === 0) return null;

  return (
    <div className="dropdown table-actions-dropdown">
      <button
        ref={triggerRef}
        type="button"
        className="action-icon-btn"
        title="Actions"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
      >
        <EllipsisVertical size={20} />
      </button>
      {open &&
        createPortal(
          <div
            ref={menuRef}
            className="dropdown-menu table-actions-menu table-actions-menu-portal"
            style={menuStyle}
          >
            {options.map((opt) => (
              <div
                key={opt.value}
                className="dropdown-item"
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onAction?.({
                    type: opt.value,
                    id: getRowId(row),
                    rowData: row,
                  });
                  setOpen(false);
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {opt.icon} {opt.label}
                </span>
              </div>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
};

/**
 * Reusable Datatable Component
 */
const Datatable = ({
  data = [],
  columns = [],
  actions = [],
  onAction = null,
  title = null,
  className = "",
}) => {
  const defaultColumns =
    columns.length > 0
      ? columns
      : [
          { key: "id", label: "ID" },
          { key: "name", label: "Name" },
        ];

  const renderCellValue = (row, column) => {
    if (column.render) {
      return column.render(row[column.key], row);
    }

    if (column.key === "status") {
      const statusValue = String(row[column.key] || "").toLowerCase();
      let statusClass = "status-default";
      switch (statusValue) {
        case "active":
          statusClass = "status-active";
          break;
        case "draft":
          statusClass = "status-draft";
          break;
        case "pending":
          statusClass = "status-pending";
          break;
        case "expired":
        case "cancelled":
          statusClass = "status-expired";
          break;
        case "disabled":
          statusClass = "status-disabled";
          break;
        case "trial":
          statusClass = "status-trial";
          break;
        default:
          statusClass = "status-default";
      }
      return (
        <span className={`status-badge ${statusClass}`}>{row[column.key]}</span>
      );
    }

    const value = row[column.key];
    if (value === null || value === undefined) return "—";
    if (typeof value === "object") {
      return value.name || value.email || JSON.stringify(value);
    }
    return value;
  };

  if (!Array.isArray(data) || data.length === 0) {
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
            {data.map((row, index) => {
              const rowKey = getRowId(row) || index;
              return (
                <tr key={rowKey}>
                  {defaultColumns.map((column) => (
                    <td
                      key={`${rowKey}-${column.key}`}
                      className={column.className}
                    >
                      {renderCellValue(row, column)}
                    </td>
                  ))}
                  {actions.length > 0 && (
                    <td className="actions-cell">
                      <div className="actions-container">
                        <ActionsDropdown
                          row={row}
                          actions={actions}
                          onAction={onAction}
                        />
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Datatable;
