import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import Modal from "../common/modal";
import "../../assets/styles/modal.css";

export const SubscriptionModal = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  mode = "edit",
  onSave,
  isLoading = false,
}) => {
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleAddFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = value;
    setFormData((prev) => ({
      ...prev,
      features: updatedFeatures,
    }));
  };

  const handleRemoveFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.plan?.trim()) {
      newErrors.plan = "Plan name is required";
    }

    if (!formData.ownerType?.trim()) {
      newErrors.ownerType = "Owner Type is required";
    }

    if (!formData.ownerId?.trim()) {
      newErrors.ownerId = "Owner ID is required";
    }

    // if (formData.isTrial === "") {
    //   newErrors.isTrial = "Trial status is required";
    // }

    if (!formData.billingCycle) {
      newErrors.billingCycle = "Billing cycle is required";
    }

    if (!formData.status) {
      newErrors.status = "Status is required";
    }

    // if (!formData.paymentId) {
    //   newErrors.paymentId = "Payment ID is required";
    // }

    if (!formData.paymentStatus) {
      newErrors.paymentStatus = "Payment Status is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    console.log("Save button clicked", { formData, mode });
    if (!validate()) {
      console.log("Validation failed", errors, formData);
      return;
    }

    const payload = {
      plan: formData.plan, // should be the plan's ID (string)
      ownerType: formData.ownerType,
      ownerId: formData.ownerId,
      // isTrial: formData.isTrial,
      billingCycle: formData.billingCycle,
      status: formData.status,
      paymentId: formData.paymentId,
      paymentStatus: formData.paymentStatus,
    };

    if (onSave) {
      console.log("Calling onSave", payload);
      onSave(payload);
    }
  };

  const inputStyle = (field) => ({
    width: "100%",
    padding: "10px",
    border: `1px solid ${errors[field] ? "#dc3545" : "#e0e0e0"}`,
    borderRadius: "6px",
    fontSize: "14px",
    color: "#333",
    boxSizing: "border-box",
    outline: "none",
  });

  const labelStyle = {
    fontSize: "12px",
    color: "#0a0a0a",
    fontWeight: "600",
    display: "block",
    marginBottom: "6px",
  };

  const errorStyle = {
    color: "#dc3545",
    fontSize: "11px",
    marginTop: "4px",
  };

  const fieldWrap = { marginBottom: "16px" };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === "add" ? "Add Subscription" : "Edit Subscription"}
      showCloseButton={true}
    >
      <div style={{ padding: "10px 0" }}>
        {/* Row 1: Plan Name + Code */}
        <div className="package-form-row">
          <div style={fieldWrap}>
            <label style={labelStyle}>Plan *</label>
            <input
              type="text"
              value={formData.plan || ""}
              placeholder="e.g., Professional"
              onChange={(e) => handleInputChange("plan", e.target.value)}
              style={inputStyle("plan")}
            />
            {errors.plan && <p style={errorStyle}>{errors.plan}</p>}
          </div>
          <div style={fieldWrap}>
            <label style={labelStyle}>Owner Type *</label>
            <input
              type="text"
              value={formData.ownerType || ""}
              placeholder="..."
              onChange={(e) => handleInputChange("ownerType", e.target.value)}
              style={inputStyle("ownerType")}
            />
            {errors.ownerType && <p style={errorStyle}>{errors.ownerType}</p>}
          </div>
        </div>

        <div className="package-form-row">
          <div style={fieldWrap}>
            <label style={labelStyle}>Owner ID *</label>
            <input
              type="text"
              value={formData.ownerId || ""}
              placeholder="..."
              onChange={(e) => handleInputChange("ownerId", e.target.value)}
              style={inputStyle("ownerId")}
            />
            {errors.ownerId && <p style={errorStyle}>{errors.ownerId}</p>}
          </div>
          
        </div>
        <div className="package-form-row">
          {/* <div style={fieldWrap}>
            <label style={labelStyle}>IsTrial *</label>
            <input
              type="text"
              value={formData.isTrial || ""}
              placeholder="..."
              onChange={(e) => handleInputChange("isTrial", e.target.value)}
              style={inputStyle("isTrial")}
            />
            {errors.isTrial && <p style={errorStyle}>{errors.isTrial}</p>}
          </div> */}
        </div>

        <div className="package-form-row">
          <div style={fieldWrap}>
            <label style={labelStyle}>Billing Cycle *</label>
            <select
              value={formData.billingCycle || ""}
              onChange={(e) =>
                handleInputChange("billingCycle", e.target.value)
              }
              style={inputStyle("billingCycle")}
            >
              <option value="">Select cycle</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
            {errors.billingCycle && (
              <p style={errorStyle}>{errors.billingCycle}</p>
            )}
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}>Status *</label>
            <input
              type="text"
              value={formData.status || ""}
              placeholder="..."
              onChange={(e) => handleInputChange("status", e.target.value)}
              style={inputStyle("status")}
            />
            {errors.status && <p style={errorStyle}>{errors.status}</p>}
          </div>
        </div>

        {/* Row 3: Price + Offer Price */}
        <div className="package-form-row">
          <div style={fieldWrap}>
            <label style={labelStyle}>Payment ID</label>
            <input
              type="text"
              value={formData.paymentId || ""}
              placeholder="..."
              onChange={(e) => handleInputChange("paymentId", e.target.value)}
              style={inputStyle("paymentId")}
            />
          </div>
          <div style={fieldWrap}>
            <label style={labelStyle}>Payment Status</label>
            <input
              type="text"
              value={formData.paymentStatus || ""}
              placeholder="..."
              onChange={(e) =>
                handleInputChange("paymentStatus", e.target.value)
              }
              style={inputStyle("paymentStatus")}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "15px",
            marginTop: "10px",
          }}
        >
          <button
            onClick={onClose}
            disabled={isLoading}
            style={{
              flex: 1,
              padding: "12px",
              border: "1px solid #e0e0e0",
              borderRadius: "6px",
              background: "white",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            style={{
              flex: 1,
              padding: "12px",
              border: "none",
              borderRadius: "6px",
              background: isLoading ? "#a07fc0" : "#5C308D",
              color: "white",
              cursor: isLoading ? "not-allowed" : "pointer",
              fontSize: "14px",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            {isLoading ? (
              <>
                <span
                  style={{
                    width: "14px",
                    height: "14px",
                    border: "2px solid rgba(255,255,255,0.4)",
                    borderTopColor: "white",
                    borderRadius: "50%",
                    display: "inline-block",
                    animation: "spin 0.7s linear infinite",
                  }}
                />
                Saving...
              </>
            ) : mode === "add" ? (
              "Create Subscription"
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Modal>
  );
}

export default SubscriptionModal;