import { useMemo } from "react";
import "../../assets/styles/recentActivity.css";
import { useViewActivityQuery } from "../../hooks/dashboard/activity.view.all";
import { mapActivityItems } from "../../utils/mapDashboardActivity";
import Pagination, { usePagination } from "./pagination";

const ITEMS_PER_PAGE = 7;

export default function RecentActivity({
  activities: propActivities,
  title = "Recent Activity",
  itemsPerPage = ITEMS_PER_PAGE,
}) {
  const fetchFromApi = propActivities == null;
  const { data: fetchedData, isLoading, isError, error } = useViewActivityQuery({
    enabled: fetchFromApi,
  });

  const activities = useMemo(() => {
    if (propActivities) return propActivities;
    return mapActivityItems(fetchedData);
  }, [propActivities, fetchedData]);

  const { currentPage, currentItems, totalPages, handlePageChange } =
    usePagination(activities, itemsPerPage);

  if (fetchFromApi && isLoading) {
    return (
      <div className="activity-card activity-loading">Loading activity...</div>
    );
  }

  if (fetchFromApi && isError) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Could not load activity";
    return (
      <div className="activity-card activity-error">{message}</div>
    );
  }

  return (
    <>
      <div className="activity-card">
        <h3 className="title">{title}</h3>
        {activities.length === 0 ? (
          <p className="no-activity">No activity to display.</p>
        ) : (
          currentItems.map((item) => (
              <div key={item.id} className="activity-row">
                <div className="left">
                  <div
                    className="mark"
                    style={{ backgroundColor: item.mark }}
                  />
                  <div>
                    <p className="name">{item.action}</p>
                    <p className="detail">{item.description}</p>
                  </div>
                </div>
                <p className="time">{item.time}</p>
              </div>
            ))
        )}
      </div>
      {activities.length > 0 && (
        <div className="activity-pagination">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
}
