import React from "react";
import Modal from "../common/modal";
import "../../assets/styles/modal.css";

const CompanyModal = ({
  isOpen,
  onClose,
  company,
  actionType,
  reason,
  setReason,
  onConfirm,
}) => {
  const handleConfirm = () => {
    if (reason.trim()) {
      onConfirm();
      onClose();
    } else {
      alert("Please provide a reason for this action");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${actionType} Company`}
      showCloseButton={true}
    >
      <div style={{ padding: "10px 0" }}>
        <p style={{ margin:'0', fontSize: "14px", color: "#666" }}>
          You are about to {actionType?.toLowerCase()}{" "}
          <strong>{company?.name}</strong>. Please provide a reason for this
          action.
        </p>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              margin: "15px 0",
              fontSize: "14px",
              fontWeight: "600",
              color: "#333",
              textAlign: "left",
            }}
          >
            Reason / Justification
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={`Enter the reason for ${actionType?.toLowerCase()}ing this company...`}
            rows={5}
            style={{
              width: "stretch",
              padding: "12px",
              border: "1px solid #e0e0e0",
              borderRadius: "6px",
              fontSize: "14px",
              fontFamily: "inherit",
              resize: "vertical",
              color: "#333",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            marginTop: "24px",
            borderTop: "1px solid #e0e0e0",
            paddingTop: "20px",
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "10px 24px",
              border: "1px solid #e0e0e0",
              borderRadius: "6px",
              background: "white",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
              color: "#333",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            style={{
              padding: "10px 24px",
              border: "none",
              borderRadius: "6px",
              background: actionType === "Disable" ? "#dc3545" : "#28a745",
              color: "white",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            {actionType} Company
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CompanyModal;
