import React from "react";
import Toggle from "../components/common/toggle";
import "../assets/styles/settings.css";

const FeatureControls = () => {
  const [checkedMap, setCheckedMap] = React.useState({});

  const onToggleChange = (index, newChecked) => {
    setCheckedMap((prev) => ({ ...prev, [index]: newChecked }));
  };

  const featurecontrols = [
    {
      id: 1,
      title: "Enable User Invites",
      message: "Allow companies to invite new users to their accounts",
    },
    {
      id: 2,
      title: "Enable Company Registration",
      message: "Allow new companies to register on the platform",
    },
    {
      id: 3,
      title: "Enable Public API",
      message: "Allow external applications to access the platform API",
    },
    {
      id: 4,
      title: "Enable Data Export",
      message: "Allow companies to export their data",
    },
  ];

  return (
    <>
      <div className="settingsForm">
        <h2>Feature Controls</h2>
        <hr className="divider" />
        {featurecontrols.map((item, index) => (
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

export default FeatureControls;
