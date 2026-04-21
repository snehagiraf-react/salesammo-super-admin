import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Mail, MapPin, Phone, Globe } from "lucide-react";
import "../../assets/styles/company.css";
import { companyData as companies } from "../../components/companyData";

const defaultCompanyData = {
  year: "Enterprise client since 2024",
  country: "United States",
  phone: "+1 (555) 123-4567",
  website: "www.example.com",
};
const subscriptionData = {
  plan: "enterprise",
  expiry: "2025-12-31",
  users: 100,
  revenue:"$10,000",
}

const ViewCompanies = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const foundCompany =
    companies.find((c) => c.id === parseInt(id)) || companies[0];
  const companyData = { ...defaultCompanyData, ...foundCompany };

  const statusClass =
    companyData.status === "ACTIVE" ? "status-active" : "status-draft";

  return (
    <>
      <h5>
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Back to Companies
        </button>
      </h5>
      <div className="company-section">
        <div className="company-card-full">
          {/* Top Section */}
          <div className="company-header">
            <div className="avatar">
              {companyData.name.substring(0, 2).toUpperCase()}
            </div>

            <div className="company-main">
              <div className="title-row">
                <h2>{companyData.name}</h2>
                <span className={`status-badge ${statusClass}`}>
                  {companyData.status}
                </span>
              </div>
              <p className="subs-sect">{companyData.year}</p>
            </div>
          </div>

          {/* Bottom Info Section */}
          <div className="company-details">
            <div className="detail-item">
              <div className="icon-box">
                <Mail size={30} />
              </div>
              <div>
                <p className="label">Email</p>
                <p>{companyData.email}</p>
              </div>
            </div>

            <div className="detail-item">
              <div className="icon-box">
                <MapPin size={30} />
              </div>
              <div>
                <p className="label">Country</p>
                <p>{companyData.country}</p>
              </div>
            </div>

            <div className="detail-item">
              <div className="icon-box">
                <Phone size={30} />
              </div>
              <div>
                <p className="label">Phone</p>
                <p>{companyData.phone}</p>
              </div>
            </div>

            <div className="detail-item">
              <div className="icon-box">
                <Globe size={30} />
              </div>
              <div>
                <p className="label">Website</p>
                <p>{companyData.website}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="company-card-full">
          <h2>Subscription</h2>
          <div>
              <div style={{margin: '20px 0'}}>
                <p className='label'>Plan</p>
                <p className="subData">{subscriptionData.plan}</p>
            </div>
              <div style={{margin: '20px 0'}}>
                <p className='label'>Expiry Date</p>
                <p className="subData-Date">{subscriptionData.expiry}</p>
              </div>

              <hr class="divider" />
              
              <div style={{margin: '20px 0'}}>
                <p className='label'>Total Users</p>
                <p className="subData-Date">{subscriptionData.users}</p>
            </div>
              <div style={{margin: '20px 0'}}>
                <p className='label'>Revenue</p>
                <p className="subData">{subscriptionData.revenue}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCompanies;
