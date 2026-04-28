import React from "react";
import Toggle from "../components/common/toggle";
import "../assets/styles/settings.css";

const SubscriptionSettings = ({ settings }) => {
  // Remove default subscriptionSettings, use settings from props
  if (!settings) return null;

  // Example: show environment if present
  return (
    <>
      <div className="settingsForm">
        <h2>Subscription Settings</h2>
        <hr className="divider" />
        {settings.environment && (
          <div className="sharing">
            <div className="sharing-info">
              <h3>Environment</h3>
              <p>{settings.environment}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SubscriptionSettings;
