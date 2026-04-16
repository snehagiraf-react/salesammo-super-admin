import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Check, Pencil } from "lucide-react";
import PackageModal from "../components/modal/packageModal";

const Packages = forwardRef((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("edit");
  const [formData, setFormData] = useState({
    plan: "",
    price: "",
    duration: "Monthly",
    userLimit: "",
    features: [],
  });

  const subcripPlans = [
    {
      plan: "Starter",
      price: "$29",
      features: [
        "Up to 10 users",
        "50 Products",
        "1,000 shares/month",
        "Basic analytics",
        "Email support",
      ],
      footer: "5 users",
    },
    {
      plan: "Professional",
      price: "$99",
      features: [
        "Up to 50 users",
        "500 products",
        "10,000 shares/month",
        "Advanced analytics",
        "Priority support",
        "Custom branding",
      ],
      footer: "50 users",
    },
    {
      plan: "Enterprise",
      price: "$399",
      features: [
        "Unlimited users",
        "Unlimited products",
        "Unlimited shares",
        "Advanced analytics",
        "24/7 support",
        "API access",
        "Dedicated account manager",
      ],
      footer: "Unlimited",
    },
  ];

  const handleEdit = (plan, index) => {
    setModalMode("edit");
    setFormData({
      plan: plan.plan,
      price: plan.price.replace("$", ""),
      duration: "Monthly",
      userLimit: plan.footer,
      features: [...plan.features],
    });
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setModalMode("add");
    setFormData({
      plan: "",
      price: "",
      duration: "Monthly",
      userLimit: "",
      features: [""],
    });
    setIsModalOpen(true);
  };
  useImperativeHandle(ref, () => ({
    openAddModal: handleAddNew
  }));
  return (
    <>
      <div className="subscription-cards-container">
        {subcripPlans.map((plan, index) => {
          return (
            <div key={index} className="subscrip-cards">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  justifyContent: "space-between",
                }}
              >
                <h3 style={{ fontSize: "16px", fontWeight: "600" }}>
                  {plan.plan}
                </h3>
                <Pencil
                  size={16}
                  style={{
                    color: "#5C308D",
                    marginLeft: "8px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleEdit(plan, index)}
                />
              </div>
              <p style={{ fontSize: "24px", fontWeight: "600" }}>
                {plan.price}
                <span>/month</span>
              </p>

              <ul>
                {plan.features.map((feature, idx) => (
                  <li key={idx}>
                    <Check size={16} style={{ color: "#5C308D" }} /> {feature}
                  </li>
                ))}
              </ul>

              <footer style={{ borderTop: "1px solid #e0e0e0" }}>
                <h6 className="company-email" style={{ margin: "10px 0" }}>
                  Users Limit
                </h6>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#000000",
                    fontWeight: "600",
                    margin: "0",
                  }}
                >
                  {plan.footer}
                </p>
              </footer>
            </div>
          );
        })}
      </div>

      <PackageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        mode={modalMode}
      />
    </>
  );
});

Packages.displayName = 'Packages';

export default Packages;
