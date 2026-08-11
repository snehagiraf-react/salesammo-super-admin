import React, { useState } from "react";
import Modal from "../common/modal";
import "../../assets/styles/modal.css";

const CreateCompanyModal = ({
  isOpen,
  onClose,
  formData,
  setFormData,
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

  const handleFileChange = (field, file) => {
    setFormData((prev) => ({
      ...prev,
      [field]: file || null,
    }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name?.trim()) newErrors.name = "Company name is required";
    if (!formData.email?.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.country?.trim()) newErrors.country = "Country is required";
    if (!formData.logo) newErrors.logo = "Logo is required";
    if (
      formData.phoneNumber &&
      !/^\d{10}$/.test(String(formData.phoneNumber).trim())
    ) {
      newErrors.phoneNumber = "Phone must be 10 digits";
    }
    if (formData.password && String(formData.password).length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    const fd = new FormData();
    fd.append("name", formData.name.trim());
    fd.append("email", formData.email.trim().toLowerCase());
    fd.append("country", formData.country.trim());
    fd.append("logo", formData.logo);

    if (formData.password?.trim()) {
      fd.append("password", formData.password.trim());
    }
    if (formData.phoneNumber?.trim()) {
      fd.append("phoneNumber", formData.phoneNumber.trim());
    }
    if (formData.websiteUrl?.trim()) {
      fd.append("websiteUrl", formData.websiteUrl.trim());
    }
    if (formData.Designation?.trim()) {
      fd.append("Designation", formData.Designation.trim());
    }
    fd.append(
      "visitingCardTemplate",
      formData.visitingCardTemplate ? "true" : "false",
    );
    if (formData.visitingCard) {
      fd.append("visitingCard", formData.visitingCard);
    }

    if (onSave) onSave(fd);
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
      title="Create Company"
      showCloseButton={true}
    >
      <div style={{ padding: "10px 0" }}>
        <div className="package-form-row">
          <div style={fieldWrap}>
            <label style={labelStyle}>Company Name *</label>
            <input
              type="text"
              value={formData.name || ""}
              placeholder="e.g., Acme Corp"
              onChange={(e) => handleInputChange("name", e.target.value)}
              style={inputStyle("name")}
            />
            {errors.name && <p style={errorStyle}>{errors.name}</p>}
          </div>
          <div style={fieldWrap}>
            <label style={labelStyle}>Email *</label>
            <input
              type="email"
              value={formData.email || ""}
              placeholder="admin@company.com"
              onChange={(e) => handleInputChange("email", e.target.value)}
              style={inputStyle("email")}
            />
            {errors.email && <p style={errorStyle}>{errors.email}</p>}
          </div>
        </div>

        <div className="package-form-row">
          <div style={fieldWrap}>
            <label style={labelStyle}>Country *</label>
            <input
              type="text"
              value={formData.country || ""}
              placeholder="e.g., India"
              onChange={(e) => handleInputChange("country", e.target.value)}
              style={inputStyle("country")}
            />
            {errors.country && <p style={errorStyle}>{errors.country}</p>}
          </div>
          <div style={fieldWrap}>
            <label style={labelStyle}>Phone</label>
            <input
              type="text"
              value={formData.phoneNumber || ""}
              placeholder="10-digit number"
              maxLength={10}
              onChange={(e) =>
                handleInputChange(
                  "phoneNumber",
                  e.target.value.replace(/\D/g, ""),
                )
              }
              style={inputStyle("phoneNumber")}
            />
            {errors.phoneNumber && (
              <p style={errorStyle}>{errors.phoneNumber}</p>
            )}
          </div>
        </div>

        <div className="package-form-row">
          <div style={fieldWrap}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              value={formData.password || ""}
              placeholder="password"
              onChange={(e) => handleInputChange("password", e.target.value)}
              style={inputStyle("password")}
            />
            {errors.password && <p style={errorStyle}>{errors.password}</p>}
          </div>
          <div style={fieldWrap}>
            <label style={labelStyle}>Website</label>
            <input
              type="url"
              value={formData.websiteUrl || ""}
              placeholder="https://example.com"
              onChange={(e) => handleInputChange("websiteUrl", e.target.value)}
              style={inputStyle("websiteUrl")}
            />
          </div>
        </div>

        <div className="package-form-row">
          <div style={fieldWrap}>
            <label style={labelStyle}>Designation</label>
            <input
              type="text"
              value={formData.Designation || ""}
              placeholder="e.g., Admin"
              onChange={(e) => handleInputChange("Designation", e.target.value)}
              style={inputStyle("Designation")}
            />
          </div>
          <div style={fieldWrap}>
            <label style={labelStyle}>Logo *</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleFileChange("logo", e.target.files?.[0] || null)
              }
              style={inputStyle("logo")}
            />
            {formData.logo?.name && (
              <p style={{ fontSize: "11px", color: "#666", marginTop: "4px" }}>
                {formData.logo.name}
              </p>
            )}
            {errors.logo && <p style={errorStyle}>{errors.logo}</p>}
          </div>
        </div>

        <div style={fieldWrap}>
          <label style={labelStyle}>Visiting Card</label>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) =>
              handleFileChange("visitingCard", e.target.files?.[0] || null)
            }
            style={inputStyle("visitingCard")}
          />
          {formData.visitingCard?.name && (
            <p style={{ fontSize: "11px", color: "#666", marginTop: "4px" }}>
              {formData.visitingCard.name}
            </p>
          )}
        </div>

        <div style={{ ...fieldWrap, display: "flex", alignItems: "center", gap: "8px" }}>
          <input
            id="visitingCardTemplate"
            type="checkbox"
            checked={Boolean(formData.visitingCardTemplate)}
            onChange={(e) =>
              handleInputChange("visitingCardTemplate", e.target.checked)
            }
          />
          <label htmlFor="visitingCardTemplate" style={{ ...labelStyle, marginBottom: 0 }}>
            Use visiting card template
          </label>
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "24px",
            paddingTop: "16px",
            borderTop: "1px solid #e0e0e0",
          }}
        >
          <button
            type="button"
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
            type="button"
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
            {isLoading ? "Creating..." : "Create Company"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateCompanyModal;
