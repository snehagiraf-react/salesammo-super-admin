import React from "react";
import FeatureControls from "../../components/featureControls";
import AccessControl from "../../components/accessControl";
import SubscriptionSettings from "../../components/subscriptionSettings";
import { useSettingsUpdate } from "../../hooks/settings/updateSettings";
import { useViewSettingsList } from "../../hooks/settings/viewAllSettings";
import { useEffect, useState } from "react";

const Settings = () => {
  const [settings, setSettings] = useState([]);

  const settingsUpdateMutation = useSettingsUpdate();
  const {
    data: settingsData,
    isLoading,
    isError,
    refetch,
  } = useViewSettingsList();
  const [openMenuId, setOpenMenuId] = React.useState(null);

  const handleSettingsUpdate = (body) => {
    settingsUpdateMutation.mutate(
      { body },
      {
        onSuccess: (data, variables) => {
          // Determine toggle state from body
          const theme = body?.branding?.theme;
          const isLight = theme === "light";
          const confirmMsg = isLight
            ? "Switched to Light mode successfully!"
            : "Switched to Dark mode successfully!";
          alert(confirmMsg);
          refetch(); // Always refresh settings from DB after update
        },
        onError: (error) => {
          alert("Failed to save settings");
          console.error("Error:", error);
        },
      },
    );
  };


  useEffect(() => {
    if (settingsData) {
      // If settingsData is an array, use the first item; else use settingsData.data or settingsData
      if (Array.isArray(settingsData)) {
        setSettings(settingsData[0] || {});
      } else if (settingsData.data) {
        setSettings(settingsData.data);
      } else {
        setSettings(settingsData);
      }
    }
  }, [settingsData]);

  return (
    <>
      <FeatureControls
        onUpdate={handleSettingsUpdate}
        settings={!isLoading && !isError ? settings : {}}
      />
      <AccessControl settings={!isLoading && !isError ? settings : {}} />
      <SubscriptionSettings settings={!isLoading && !isError ? settings : {}} />
    </>
  );
};

export default Settings;
