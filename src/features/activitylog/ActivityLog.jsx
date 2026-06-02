import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { getPageTitle } from "../../utils/getPageTitle";
import Tabs from "../../components/tabs";
import "../../assets/styles/package.css";
import DropdownSelect from "../../components/common/dropdownList";
import RecentActivity from "../../components/common/recentActivity";
import { useViewActivityQuery } from "../../hooks/dashboard/activity.view.all";
import { mapActivityItems } from "../../utils/mapDashboardActivity";
import SearchItem from "../../components/common/searchItem";

const RANGE_TO_CUTOFF = {
  "7d": (now) => new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
  "30d": (now) => new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
  "3m": (now) => {
    const cutoff = new Date(now);
    cutoff.setMonth(cutoff.getMonth() - 3);
    return cutoff;
  },
  "1y": (now) => {
    const cutoff = new Date(now);
    cutoff.setFullYear(cutoff.getFullYear() - 1);
    return cutoff;
  },
};

const ActivityLog = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("products");
  const [range, setRange] = useState("3m");
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const { data: activityData } = useViewActivityQuery({
    params: { resource: activeTab },
  });

  const options = [
    { label: "Last 7 days", value: "7d" },
    { label: "Last 30 days", value: "30d" },
    { label: "Last 3 months", value: "3m" },
    { label: "Last year", value: "1y" },
  ];

  // 🔹 Tabs
  const tabs = [
    { key: "products", label: "Products" },
    { key: "industries", label: "Industries" },
    { key: "invites", label: "Invites" },
    { key: "subscriptions", label: "Subscriptions" },
  ];

  const allActivities = useMemo(
    () => mapActivityItems(activityData),
    [activityData],
  );

  const rows = useMemo(() => {
    const resolveCutoff = RANGE_TO_CUTOFF[range];
    if (!resolveCutoff) return allActivities;

    const now = new Date();
    const nowMs = now.getTime();
    const cutoffMs = resolveCutoff(now).getTime();

    return allActivities.filter((item) => {
      if (!item.timestamp) return false;
      const activityTime = new Date(item.timestamp).getTime();
      if (Number.isNaN(activityTime)) return false;
      return activityTime >= cutoffMs && activityTime <= nowMs;
    });
  }, [allActivities, range]);

  const filteredRows = isSearching ? filteredActivities : rows;

  

  return (
    <>


      {/* Header */}
      <div className="activitylog-header">
        <h1 className="page-title">{getPageTitle(location.pathname)}</h1>
        <div className="activitylog-controls">
          {/* <DropdownSelect options={options} value={range} onChange={setRange} /> */}
         
        </div>
      </div>

      {/* SEARCH */}
      <SearchItem
        data={rows}
        searchField={[
          "action",
          "description",
        ]}
        placeholder="Search logs..."
        onResultsChange={({ filteredData, searchItem }) => {
          setFilteredActivities(filteredData);

          setIsSearching(searchItem?.trim()?.length > 0);
        }}
      />

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Activity list */}
      <div style={{ marginTop: "20px" }}>
        <RecentActivity
          title={`${tabs.find((tab) => tab.key === activeTab)?.label || "Recent"} Activity`}
          activities={filteredRows}
        />

        <div className="activitylog-footer">
          <span>
            Showing {filteredRows.length} of {rows.length} activities
          </span>
        </div>
      </div>
    </>
  );
};

export default ActivityLog;
