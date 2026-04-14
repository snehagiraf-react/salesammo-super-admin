import "../../assets/styles/recentActivity.css";

const activities = [
  {
    mark: "#5C308D",
    name: "Company registered",
    action: "TechStart Inc.",
    time: "5 mins ago"
  },
  {
    mark: "#00A63E",
    name: "Subscription Purchased",
    action: "Enteprise Plan - Acme Ltd",
    time: "12 mins ago"
  },
  {
    mark: "#F59E0B",
    name: "User Invited",
    action: "johnmathew398@gmail.com by HealthcarePlus Inc",
    time: "1 hr ago"
  },
  {
    mark: "#5C308D",
    name: "Product added",
    action: "Updated Profile",
    time: "5 mins ago"
  },
  {
    mark: "#5C308D",
    name: "Industry added",
    action: "Healthcare by Admin",
    time: "5 mins ago"
  }
];

export default function RecentActivity() {
  return (
    <div className="activity-card">
      <h3 className="title">Recent Activity</h3>

      {activities.map((item, index) => (
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
      ))}
    </div>
  );
}