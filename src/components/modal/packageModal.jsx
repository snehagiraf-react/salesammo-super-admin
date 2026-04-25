import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import Modal from "../common/modal";
import "../../assets/styles/modal.css";

const PackageModal = ({
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

  const handleLimitChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      limits: {
        ...prev.limits,
        [field]: value,
      },
    }));
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
    if (!formData.name?.trim()) newErrors.name = "Plan name is required";
    if (!formData.code?.trim()) newErrors.code = "Code is required";
    if (!formData.type) newErrors.type = "Type is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.billingCycle) newErrors.billingCycle = "Billing cycle is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    console.log('Save button clicked', { formData, mode });
    if (!validate()) {
      console.log('Validation failed', errors, formData);
      return;
    }

    const payload = {
      name: formData.name,
      description: formData.description || "",
      code: formData.code,
      type: formData.type,
      features: formData.features.filter((f) => f.trim() !== ""),
      limits: {
        maxUsers: Number(formData.limits?.maxUsers) || 0,
        storageSpaceInGB: Number(formData.limits?.storageSpaceInGB) || 0,
      },
      pricing: [
        {
          billingCycle: formData.billingCycle,
          price: Number(formData.price),
          offerPrice: formData.offerPrice ? Number(formData.offerPrice) : undefined,
        },
      ],
    };

    if (onSave) {
      console.log('Calling onSave', payload);
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
      title={mode === "add" ? "Add Package" : "Edit Package"}
      showCloseButton={true}
    >
      <div style={{ padding: "10px 0" }}>

        {/* Row 1: Plan Name + Code */}
        <div className="package-form-row">
          <div style={fieldWrap}>
            <label style={labelStyle}>Plan Name *</label>
            <input
              type="text"
              value={formData.name || ""}
              placeholder="e.g., Professional"
              onChange={(e) => handleInputChange("name", e.target.value)}
              style={inputStyle("name")}
            />
            {errors.name && <p style={errorStyle}>{errors.name}</p>}
          </div>
          <div style={fieldWrap}>
            <label style={labelStyle}>Plan Code *</label>
            <input
              type="text"
              value={formData.code || ""}
              placeholder="e.g., PRO_MONTHLY"
              onChange={(e) => handleInputChange("code", e.target.value)}
              style={inputStyle("code")}
            />
            {errors.code && <p style={errorStyle}>{errors.code}</p>}
          </div>
        </div>

        {/* Row 2: Type + Billing Cycle */}
        <div className="package-form-row">
          <div style={fieldWrap}>
            <label style={labelStyle}>Type *</label>
            <select
              value={formData.type || ""}
              onChange={(e) => handleInputChange("type", e.target.value)}
              style={inputStyle("type")}
            >
              <option value="">Select type</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
            {errors.type && <p style={errorStyle}>{errors.type}</p>}
          </div>
          <div style={fieldWrap}>
            <label style={labelStyle}>Billing Cycle *</label>
            <select
              value={formData.billingCycle || ""}
              onChange={(e) => handleInputChange("billingCycle", e.target.value)}
              style={inputStyle("billingCycle")}
            >
              <option value="">Select cycle</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
            {errors.billingCycle && <p style={errorStyle}>{errors.billingCycle}</p>}
          </div>
        </div>

        {/* Row 3: Price + Offer Price */}
        <div className="package-form-row">
          <div style={fieldWrap}>
            <label style={labelStyle}>Price (₹) *</label>
            <input
              type="number"
              value={formData.price || ""}
              placeholder="0"
              min="0"
              onChange={(e) => handleInputChange("price", e.target.value)}
              style={inputStyle("price")}
            />
            {errors.price && <p style={errorStyle}>{errors.price}</p>}
          </div>
          <div style={fieldWrap}>
            <label style={labelStyle}>Offer Price (₹)</label>
            <input
              type="number"
              value={formData.offerPrice || ""}
              placeholder="0"
              min="0"
              onChange={(e) => handleInputChange("offerPrice", e.target.value)}
              style={inputStyle("offerPrice")}
            />
          </div>
        </div>

        {/* Row 4: Max Users + Storage */}
        <div className="package-form-row">
          <div style={fieldWrap}>
            <label style={labelStyle}>Max Users</label>
            <input
              type="number"
              value={formData.limits?.maxUsers || ""}
              placeholder="e.g., 10"
              min="0"
              onChange={(e) => handleLimitChange("maxUsers", e.target.value)}
              style={inputStyle("maxUsers")}
            />
          </div>
          <div style={fieldWrap}>
            <label style={labelStyle}>Storage (GB)</label>
            <input
              type="number"
              value={formData.limits?.storageSpaceInGB || ""}
              placeholder="e.g., 5"
              min="0"
              onChange={(e) => handleLimitChange("storageSpaceInGB", e.target.value)}
              style={inputStyle("storageSpaceInGB")}
            />
          </div>
        </div>

        {/* Description */}
        <div style={fieldWrap}>
          <label style={labelStyle}>Description</label>
          <textarea
            value={formData.description || ""}
            placeholder="Enter description"
            rows={3}
            onChange={(e) => handleInputChange("description", e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #e0e0e0",
              borderRadius: "6px",
              fontSize: "14px",
              color: "#333",
              resize: "vertical",
              boxSizing: "border-box",
              outline: "none",
            }}
          />
        </div>

        {/* Features */}
        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <label style={labelStyle}>Features</label>
            <button
              onClick={handleAddFeature}
              style={{
                background: "none",
                border: "none",
                color: "#5C308D",
                fontSize: "14px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                fontWeight: "500",
              }}
            >
              + Add Feature
            </button>
          </div>
          {(formData.features || []).map((feature, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              <input
                type="text"
                value={feature}
                placeholder="Enter feature"
                onChange={(e) => handleFeatureChange(idx, e.target.value)}
                style={{
                  flex: 1,
                  padding: "10px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "6px",
                  fontSize: "14px",
                  color: "#333",
                  outline: "none",
                }}
              />
              <Trash2
                size={18}
                style={{ color: "#dc3545", cursor: "pointer", flexShrink: 0 }}
                onClick={() => handleRemoveFeature(idx)}
              />
            </div>
          ))}
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
              "Create Package"
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
};

export default PackageModal;
