
import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Pencil, Check  } from "lucide-react";
import PackageModal from "../components/modal/packageModal";
import { usePackageStore } from "../hooks/plans/addplans";
import { usePlanUpdate } from "../hooks/plans/update";


const Packages = forwardRef((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("edit");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    code: "",
    type: "",
    billingCycle: "",
    price: "",
    offerPrice: "",
    limits: {
      maxUsers: "",
      storageSpaceInGB: "",
    },
    features: [""],
  });


  const subcripPlans = props.data || [];
  const addPackageMutation = usePackageStore();
  const updatePackageMutation = usePlanUpdate();
  const [editingPlanId, setEditingPlanId] = useState(null);

  const handleEdit = (plan) => {
    const pricing = plan.pricing?.[0] || {};
    setModalMode("edit");
    setEditingPlanId(plan._id || plan.id);
    setFormData({
      name: plan.name || "",
      description: plan.description || "",
      code: plan.code || "",
      type: plan.type || "",
      billingCycle: pricing.billingCycle || "",
      price: pricing.price || "",
      offerPrice: pricing.offerPrice || "",
      limits: {
        maxUsers: plan.limits?.maxUsers || "",
        storageSpaceInGB: plan.limits?.storageSpaceInGB || "",
      },
      features: (plan.features || []).filter((f) => typeof f === "string"),
    });
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setModalMode("add");
    setFormData({
      name: "",
      description: "",
      code: "",
      type: "",
      billingCycle: "",
      price: "",
      offerPrice: "",
      limits: {
        maxUsers: "",
        storageSpaceInGB: "",
      },
      features: [""],
    });
    setIsModalOpen(true);
  };

  useImperativeHandle(ref, () => ({
    openAddModal: handleAddNew,
  }));

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      code: "",
      type: "",
      billingCycle: "",
      price: "",
      offerPrice: "",
      limits: { maxUsers: "", storageSpaceInGB: "" },
      features: [""],
    });
    setEditingPlanId(null);
  };

  const handleSave = (payload) => {
    if (modalMode === "add") {
      addPackageMutation.mutate(payload, {
        onSuccess: () => {
          setIsModalOpen(false);
          resetForm();
          if (props.onRefresh) props.onRefresh();
        },
        onError: (err) => {
          console.error("Failed to create package:", err);
        },
      });
    } else if (modalMode === "edit" && editingPlanId) {
      updatePackageMutation.mutate(
        { id: editingPlanId, body: payload },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            resetForm();
            if (props.onRefresh) props.onRefresh();
          },
          onError: (err) => {
            console.error("Failed to update package:", err);
          },
        }
      );
    }
  };

  return (
    <>
      <div className="subscription-cards-container">
        {subcripPlans.map((plan, index) => (
          <div key={index} className="subscrip-cards" style={{ position: 'relative' }}>
            {plan.code && (
              <div style={{
                position: 'absolute',
                top: '-16px',
                left: 0,
                right: 0,
                zIndex: 10,
                background: 'transparent',
              }}>
                <span className="plan-code-badge">
                  {plan.code}
                </span>
              </div>
            )}
            <div className="contain-head" style={{ marginTop: '15px' }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div
                  className={plan.type === "paid" ? "type-color" : "type-free"}
                >
                  {plan.type === "paid" ? "Paid" : "Free"}
                </div>

                {plan.isActive ? (
                  <button className="action-button">Active</button>
                ) : (
                  <button className="action-button-inactive">Inactive</button>
                )}
              </div>
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "20px 0",
                justifyContent: "space-between",
              }}
            >
              <h3 style={{ fontSize: "14px", fontWeight: "600" }}>
                {plan.name}
              </h3>
            </div>

            <p
              style={{ fontSize: "24px", fontWeight: "600", color: "#5C308D" }}
            >
              {Array.isArray(plan.pricing) &&
              plan.pricing[0] &&
              plan.pricing[0].offerPrice ? (
                <>
                  <span
                    style={{
                      fontSize: "24px",
                      fontWeight: "600",
                      color: "#5C308D",
                      marginRight: "8px",
                    }}
                  >
                    ₹{plan.pricing[0].offerPrice}
                  </span>
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: "400",
                      color: "#888",
                      textDecoration: "line-through",
                    }}
                  >
                    ₹{plan.pricing[0].price}
                  </span>
                </>
              ) : (
                <span
                  style={{
                    fontSize: "24px",
                    fontWeight: "600",
                    color: "#5C308D",
                  }}
                >
                  ₹
                  {Array.isArray(plan.pricing) && plan.pricing[0]
                    ? plan.pricing[0].price
                    : ""}
                </span>
              )}
              {plan.pricing && plan.pricing[0] && (
                <span style={{ fontSize: '13px', fontWeight: 500, color: '#5C308D', marginLeft: '2px' }}>
                  /{plan.pricing[0].billingCycle}
                </span>
              )}
            </p>

            <p
              style={{
                fontSize: "12px",
                fontWeight: "600",
                color: "#222222b6",
                margin: "5px 0",
              }}
            >
              {plan.description}
            </p>

            <div
              style={{
                margin: "15px 0",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {plan.features &&
                plan.features.map((feature, idx) => (
                  <span
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "12px",
                      color: "#222222b6",
                      margin: "0",
                      gap: "4px",
                      lineHeight: "20px",

                    }}
                  >
                   <Check size={18} className="check-icon"/> {feature}
                  </span>
                ))}
            </div>

            <footer style={{ borderTop: "1px solid #e0e0e0" }}>
              <div className="footer-sect">
                <h6 className="company-email" style={{ margin: "10px 0" }}>
                  Users Limit
                </h6>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#222222e2",
                    fontWeight: "600",
                    margin: "0",
                  }}
                >
                  {plan.limits.maxUsers}

                  {/* {plan.limits
                  ? `Users: ${plan.limits.maxUsers}, Storage: ${plan.limits.storageSpaceInGB}GB`
                  : "N/A"} */}
                </p>
              </div>
              <div className="footer-sect">
                <h6 className="company-email" style={{ margin: "10px 0" }}>
                  Storage
                </h6>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#222222e2",
                    fontWeight: "600",
                    margin: "0",
                  }}
                >
                  {plan.limits.storageSpaceInGB} GB
                  {/* {plan.limits
                  ? `Users: ${plan.limits.maxUsers}, Storage: ${plan.limits.storageSpaceInGB}GB`
                  : "N/A"} */}
                </p>
              </div>
            </footer>
          </div>
        ))}
      </div>
      <PackageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        mode={modalMode}
        onSave={handleSave}
        isLoading={modalMode === 'add' ? addPackageMutation.isPending : updatePackageMutation.isPending}
      />
    </>
  );
});

export default Packages;
