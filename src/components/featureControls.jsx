import React, { useContext } from "react";
import Toggle from "../components/common/toggle";
import "../assets/styles/settings.css";
import { ThemeContext } from "../context/ThemeContext";


const FeatureControls = ({ onUpdate, settings }) => {
  const branding = settings?.branding || null;
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [toggleChecked, setToggleChecked] = React.useState(false);

  // Sync toggle with API and context
  React.useEffect(() => {
    if (branding?.theme) {
      setToggleChecked(branding.theme === "dark");
    } else {
      setToggleChecked(theme === "dark");
    }
  }, [branding, theme]);

  // Toggle handler
  const handleToggle = (checked) => {
    setToggleChecked(checked);
    const newTheme = checked ? "dark" : "light";
    // Update theme globally via context
    if (theme !== newTheme) toggleTheme();
    // Send to backend
    onUpdate?.({
      branding: { ...branding, theme: newTheme },
    });
  };

  return (
    <div className="settingsForm">
      <h2>Feature Controls</h2>
      <hr className="divider" />

      {branding && (
        <div className="sharing">
          <div className="sharing-info">
            <h3>Branding</h3>
            <p>Theme: {branding.theme}</p>
            <p>Primary Color: {branding.primaryColor}</p>
            <img
              src={branding.logoUrl}
              alt="Logo"
              style={{ maxWidth: 120, marginTop: 10 }}
            />
          </div>

          <div className="sharing-toggle">
            <Toggle checked={toggleChecked} onChange={handleToggle} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FeatureControls;