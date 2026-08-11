import React, { useEffect, useMemo, useState } from "react";
import Modal from "../common/modal";
import "../../assets/styles/modal.css";
import { useViewPlanQuery } from "../../hooks/plans/viewplan";
import { useViewCompanyQuery } from "../../hooks/company/viewCompany";
import { useCompanyQuery } from "../../hooks/company/viewCompany";

const toDateInputValue = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
};

const addDays = (baseDate, days) => {
  const date = new Date(baseDate);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

const SubscriptionModal = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  mode = "edit",
  onSave,
  isLoading = false,
}) => {
  const [errors, setErrors] = useState({});
  const { data: plansData, isLoading: plansLoading } = useViewPlanQuery();
  const { data: companiesData, isLoading: companiesLoading } =
    useViewCompanyQuery();

  const plans = useMemo(() => {
    const raw = Array.isArray(plansData) ? plansData : plansData?.data;
    return (Array.isArray(raw) ? raw : []).filter(
      (p) => p && (p._id || p.id) && p.isActive !== false,
    );
  }, [plansData]);

  const companies = useMemo(() => {
    const raw = Array.isArray(companiesData)
      ? companiesData
      : companiesData?.data;
    return Array.isArray(raw) ? raw : [];
  }, [companiesData]);

  const selectedPlanId =
    typeof formData.plan === "object" && formData.plan !== null
      ? formData.plan._id || formData.plan.id || ""
      : formData.plan || "";

  const selectedOwnerId =
    typeof formData.ownerId === "object" && formData.ownerId !== null
      ? formData.ownerId._id || formData.ownerId.id || ""
      : formData.ownerId || "";

  // Prefill missing dates once when add modal opens
  useEffect(() => {
    if (!isOpen || mode !== "add") return;

    setFormData((prev) => {
      if (prev.startDate && prev.endDate) return prev;

      const today = new Date().toISOString().slice(0, 10);
      const cycleDays = prev.billingCycle === "yearly" ? 365 : 30;
      const next = { ...prev };

      if (!prev.startDate) next.startDate = today;
      if (prev.status === "trial") {
        if (!prev.trialEndDate) next.trialEndDate = addDays(today, 7);
        if (!prev.endDate) next.endDate = next.trialEndDate;
      } else if (!prev.endDate) {
        next.endDate = addDays(today, cycleDays);
      }

      return next;
    });
  }, [isOpen, mode, setFormData]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      const next = {
        ...prev,
        [field]: value,
        ...(field === "ownerType" ? { ownerId: "" } : {}),
      };

      if (field === "status") {
        next.isTrial = value === "trial";
        if (value !== "trial") next.trialEndDate = "";
      }

      if (field === "billingCycle" || field === "status") {
        const start = prev.startDate || new Date().toISOString().slice(0, 10);
        const cycleDays =
          (field === "billingCycle" ? value : prev.billingCycle) === "yearly"
            ? 365
            : 30;
        const statusValue = field === "status" ? value : prev.status;

        if (statusValue === "trial") {
          next.trialEndDate = addDays(start, 7);
          next.endDate = next.trialEndDate;
        } else {
          next.endDate = addDays(start, cycleDays);
        }
      }

      if (field === "startDate" && value) {
        const cycleDays = prev.billingCycle === "yearly" ? 365 : 30;
        if (prev.status === "trial") {
          next.trialEndDate = addDays(value, 7);
          next.endDate = next.trialEndDate;
        } else {
          next.endDate = addDays(value, cycleDays);
        }
      }

      return next;
    });

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!selectedPlanId) newErrors.plan = "Plan is required";
    if (!formData.ownerType) newErrors.ownerType = "Owner type is required";
    if (!selectedOwnerId) newErrors.ownerId = "Owner is required";
    if (!formData.status) newErrors.status = "Status is required";
    if (!formData.paymentStatus) {
      newErrors.paymentStatus = "Payment status is required";
    }
    if (!formData.billingCycle) {
      newErrors.billingCycle = "Billing cycle is required";
    }
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    if (formData.status === "trial" && !formData.trialEndDate) {
      newErrors.trialEndDate = "Trial end date is required for trial status";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    const payload = {
      plan: String(selectedPlanId),
      planId: String(selectedPlanId),
      ownerType: String(formData.ownerType).toLowerCase(),
      ownerId: String(selectedOwnerId),
      status: formData.status,
      paymentStatus: formData.paymentStatus,
      billingCycle: String(formData.billingCycle || "monthly").toLowerCase(),
      startDate: formData.startDate
        ? new Date(formData.startDate).toISOString()
        : undefined,
      endDate: formData.endDate
        ? new Date(formData.endDate).toISOString()
        : undefined,
      trialEndDate:
        formData.status === "trial" && formData.trialEndDate
          ? new Date(formData.trialEndDate).toISOString()
          : null,
      isTrial: formData.status === "trial",
      replaceExisting: Boolean(formData.replaceExisting),
      PlanHistory: Array.isArray(formData.PlanHistory)
        ? formData.PlanHistory
        : [],
    };

    if (onSave) onSave(payload);
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
        <div className="package-form-row">
          <div style={fieldWrap}>
            <label style={labelStyle}>Plan *</label>
            <select
              value={selectedPlanId}
              onChange={(e) => handleInputChange("plan", e.target.value)}
              style={inputStyle("plan")}
              disabled={plansLoading}
            >
              <option value="">
                {plansLoading ? "Loading plans..." : "Select plan"}
              </option>
              {plans.map((plan) => (
                <option key={plan._id || plan.id} value={plan._id || plan.id}>
                  {plan.name}
                  {plan.code ? ` (${plan.code})` : ""}
                </option>
              ))}
            </select>
            {errors.plan && <p style={errorStyle}>{errors.plan}</p>}
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}>Owner Type *</label>
            <select
              value={formData.ownerType || ""}
              onChange={(e) => handleInputChange("ownerType", e.target.value)}
              style={inputStyle("ownerType")}
            >
              <option value="">Select owner type</option>
              <option value="company">Company</option>
              <option value="user">User</option>
            </select>
            {errors.ownerType && <p style={errorStyle}>{errors.ownerType}</p>}
          </div>
        </div>

        <div className="package-form-row">
          <div style={fieldWrap}>
            <label style={labelStyle}>Owner *</label>
            {formData.ownerType === "company" ? (
              <select
                value={selectedOwnerId}
                onChange={(e) => handleInputChange("ownerId", e.target.value)}
                style={inputStyle("ownerId")}
                disabled={companiesLoading}
              >
                <option value="">
                  {companiesLoading ? "Loading companies..." : "Select company"}
                </option>
                {companies.map((company) => (
                  <option
                    key={company._id || company.id}
                    value={company._id || company.id}
                  >
                    {company.name || company.company_name || company.email}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={selectedOwnerId}
                placeholder="Paste user MongoDB ObjectId"
                onChange={(e) => handleInputChange("ownerId", e.target.value)}
                style={inputStyle("ownerId")}
                disabled={!formData.ownerType}
              />
            )}
            {errors.ownerId && <p style={errorStyle}>{errors.ownerId}</p>}
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}>Status *</label>
            <select
              value={formData.status || ""}
              onChange={(e) => handleInputChange("status", e.target.value)}
              style={inputStyle("status")}
            >
              <option value="">Select status</option>
              <option value="trial">Trial</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="cancelled">Cancelled</option>
            </select>
            {errors.status && <p style={errorStyle}>{errors.status}</p>}
          </div>
        </div>

        <div className="package-form-row">
          <div style={fieldWrap}>
            <label style={labelStyle}>Payment Status *</label>
            <select
              value={formData.paymentStatus || ""}
              onChange={(e) =>
                handleInputChange("paymentStatus", e.target.value)
              }
              style={inputStyle("paymentStatus")}
            >
              <option value="">Select payment status</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="failed">Failed</option>
            </select>
            {errors.paymentStatus && (
              <p style={errorStyle}>{errors.paymentStatus}</p>
            )}
          </div>

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
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "15px",
            marginTop: "10px",
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
            }}
          >
            {isLoading
              ? "Saving..."
              : mode === "add"
                ? "Create Subscription"
                : "Save Changes"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SubscriptionModal;
