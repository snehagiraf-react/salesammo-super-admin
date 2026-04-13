import React, { useState, useEffect, useMemo, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "../../assets/styles/sidebar.css";
import { AuthContext } from "../../features/auth/AuthProvider";

import {
  LayoutDashboard,
  Users,
  Podcast,
  Folders,
  PackageSearch,
  Factory,
  Pyramid,
  Tags,
  FileUser,
  ChartNoAxesCombined ,
  Settings,
  LogOut 
} from "lucide-react";

import sidebarLogo from "../../assets/images/logo.png";
// import admin from '../../assets/images/admin.png';

export default function Sidebar({ isOpen, closeSidebar }) {
  const menuItems = useMemo(
    () => [
      { path: "/dashboard", label: "Dashboard" },
      { path: "/users", label: "Users" },
      { path: "/subscription", label: "Subscription" },
      { path: "/categories", label: "Categories" },
      { path: "/products", label: "Products" },
      { path: "/industries", label: "Industries" },
      { path: "/clients", label: "Clients" },
      { path: "/tags", label: "Tags" },
      { path: "/applicationImages", label: "Application Images" },
      { path: "/analytics", label: "Analytics" },
      { path: "/settings", label: "Settings" },
    ],
    [],
  );

  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const [activeItem, setActiveItem] = useState(location.pathname);
  const [openDropdowns, setOpenDropdowns] = useState({});

  /* ---------------- MOBILE / TOUCH DETECTION ---------------- */
  const shouldCloseSidebar = () =>
    window.innerWidth < 768 || navigator.maxTouchPoints > 0;

  const handleNavClick = (path) => {
    setActiveItem(path);
    if (shouldCloseSidebar()) {
      closeSidebar();
    }
  };

  /* ---------------- EFFECTS ---------------- */
  useEffect(() => {
    setActiveItem(location.pathname);

    // Auto open dropdown if current route is inside it
    menuItems.forEach((item) => {
      if (item.hasDropdown) {
        const match = item.subItems.some(
          (sub) => location.pathname === sub.path,
        );
        if (match) {
          setOpenDropdowns((prev) => ({ ...prev, [item.label]: true }));
        }
      }
    });
  }, [location.pathname, menuItems]);

  /* ---------------- HELPERS ---------------- */
  const isActive = (item) => {
    if (!activeItem || activeItem === "/") {
      return item.path === "/dashboard";
    }
    if (item.hasDropdown && item.subItems) {
      return (
        item.subItems.some((sub) => sub.path === activeItem) ||
        activeItem === item.path
      );
    }
    return activeItem === item.path;
  };

  const toggleDropdown = (label) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const renderIcon = (label) => {
    switch (label) {
      case "Dashboard":
        return <LayoutDashboard size={20}/>;
      case "Users":
        return <Users size={20}/>;
      case "Subscription":
        return <Podcast size={20}/>;
      case "Categories":
        return <Folders size={20}/>;
      case "Products":
        return <PackageSearch size={20}/>;
      case "Industries":
        return <Factory size={20}/>;
      case "Clients":
        return <FileUser size={20}/>;
      case "Tags":
        return <Tags size={20}/>;
      case "Application Images":
        return <Pyramid size={20}/>;
      case "Analytics":
        return <ChartNoAxesCombined size={20}/>;
      case "Settings":
        return <Settings size={20}/>;
      default:
        return null;
    }
  };

  /* ---------------- RENDER ---------------- */
  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <img src={sidebarLogo} alt="Sidebar Logo" />
      </div>

      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li
              key={item.path || item.label}
              className={isActive(item) ? "active" : ""}
            >
              {item.hasDropdown ? (
                <>
                  <a
                    href="#!"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleDropdown(item.label);
                    }}
                    className={isActive(item) ? "active" : ""}
                  >
                    <span className={`icon ${isActive(item) ? "active" : ""}`}>
                      {renderIcon(item.label)}
                    </span>
                    <span className={`label ${isActive(item) ? "active" : ""}`}>
                      {item.label}
                    </span>
                  </a>
                  {openDropdowns[item.label] && (
                    <ul className="nested-submenu">
                      {item.subItems.map((subItem) => (
                        <li
                          key={subItem.path || subItem.label}
                          className={
                            location.pathname === subItem.path ? "active" : ""
                          }
                        >
                          <Link
                            to={subItem.path}
                            onClick={() => handleNavClick(subItem.path)}
                          >
                            <span className="label">{subItem.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link to={item.path} onClick={() => handleNavClick(item.path)}>
                  <span className={`icon ${isActive(item) ? "active" : ""}`}>
                    {renderIcon(item.label)}
                  </span>
                  <span className={`label ${isActive(item) ? "active" : ""}`}>
                    {item.label}
                  </span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="bottom">
        
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
