import React from "react";
import Toggle from "../components/common/toggle";
import "../assets/styles/settings.css";

const AccessControl = ({ settings }) => {
  // Remove default accesscontrol, use settings from props
  if (!settings) return null;

  // Example: show support email if present
  return (
    <>
      <div className="settingsForm">
        <h2>Access Control</h2>
        <hr className="divider" />
        {settings.supportDetails && (
          <div className="sharing">
            
            <div className="sharing-info">
              <h3>Support Email</h3>
              <p>{settings.supportDetails.supportEmail}</p>
            </div>
            
          </div>
        )}
      </div>
    </>
  );
};

export default AccessControl;
