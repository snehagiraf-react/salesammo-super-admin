import React from "react";
import Toggle from "../components/common/toggle";
import "../assets/styles/settings.css";

const AccessControl = () => {
  const [checkedMap, setCheckedMap] = React.useState({});

  const onToggleChange = (index, newChecked) => {
    setCheckedMap((prev) => ({ ...prev, [index]: newChecked }));
  };

  const accesscontrol = [
    {
      id: 1,
      title: "Allow Sharing",
      message: "Enable content sharing features across the platform",
    },
    {
      id: 2,
      title: "Require Email Verification",
      message: "Force users to verify their email before accessing features",
    },
  ];

  return (
    <>
      <div className="settingsForm">
        <h2>Access Control</h2>
        <hr className="divider" />
        {accesscontrol.map((item, index) => (
          <div key={item.id} className="sharing">
            <div className="sharing-info">
              <h3>{item.title}</h3>
              <p>{item.message}</p>
            </div>
            <div className="sharing-toggle">
              <Toggle
                onChange={(newChecked) => onToggleChange(index, newChecked)}
                checked={checkedMap[index] ?? index !== 2}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AccessControl;
