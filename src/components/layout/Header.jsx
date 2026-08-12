import "../../assets/styles/header.css";
import { GoBell } from "react-icons/go";
import { TfiMenuAlt } from "react-icons/tfi";
import { UserRound } from "lucide-react";
import { useAuth } from "../../features/auth/AuthProvider";

export default function Header({ onToggleSidebar }) {
  const { user } = useAuth();

  const displayName = user?.name || "Admin User";
  const displayEmail = user?.email || "—";

  return (
    <>
      <header>
        <nav className="header_nav">
          <div className="header_container">
            <div className="menuSearch">
              <TfiMenuAlt
                onClick={onToggleSidebar}
                className="menubar"
                size={25}
              />
            </div>
            <div className="header_title" />

            <div className="profile">
              <GoBell size={22} className="notificationIcon" />
              <div className="profile-divider" />
              <div className="profile-info-row">
                <UserRound size={35} className="profile-avatar" />
                <div className="profile-text">
                  <p className="dropdown-name">{displayName}</p>
                  <p className="dropdown-email">{displayEmail}</p>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
