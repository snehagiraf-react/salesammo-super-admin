import "../../assets/styles/recentActivity.css";

export default function RecentActivity({ activities = [], title = "Recent Activity" }) {
  return (
    <div className="activity-card">
      <h3 className="title">{title}</h3>
      {activities.length === 0 ? (
        <p className="no-activity">No activity to display.</p>
      ) : (
        activities.map((item, index) => (
          <div key={index} className="activity-row">
            {/* Left Side */}
            <div className="left">
              <div className="mark" style={{ backgroundColor: item.mark }}></div>
              <div>
                <p className="name">{item.name}</p>
                <p className="action">{item.action}</p>
              </div>
            </div>
            {/* Right Side */}
            <p className="time">{item.time}</p>
          </div>
        ))
      )}
    </div>
  );
}