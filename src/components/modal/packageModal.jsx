import React from 'react'
import { Trash2 } from "lucide-react";
import Modal from "../common/modal";
import '../../assets/styles/modal.css';

const PackageModal = ({isOpen, onClose, formData, setFormData, mode = "edit"}) => {

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, ""]
    }));
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = value;
    setFormData(prev => ({
      ...prev,
      features: updatedFeatures
    }));
  };

  const handleRemoveFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    if (mode === "add") {
      console.log("Creating new package:", formData);
      // Add your create logic here
    } else {
      console.log("Saving package data:", formData);
      // Add your update logic here
    }
    onClose();
  };
  
  return (
    <Modal
      isOpen={isOpen} 
      onClose={onClose} 
      title={mode === "add" ? "Add Package" : "Edit Package"}
      showCloseButton={true}
    >
        <div style={{ padding: "10px 0" }}>
          <div className="package-form-row">
            <div>
              <label>
                Plan Name
              </label>
              <input
                type="text"
                value={formData.plan}
                placeholder={mode === "add" ? "e.g., Professional" : "Starter"}
                onChange={(e) => handleInputChange("plan", e.target.value)}
                style={{
                    width:"stretch",
                  padding: "10px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "6px",
                  fontSize: "14px",
                  color: "#999"
                }}
              />
            </div>
            <div>
              <label>
                Price
              </label>
              <input
                type="text"
                value={formData.price}
                placeholder="0"
                onChange={(e) => handleInputChange("price", e.target.value)}
                style={{
                width:"stretch",
                  padding: "10px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "6px",
                  fontSize: "14px",
                  color: "#999"
                }}
              />
            </div>
          </div>

          <div className="package-form-row">
            <div>
              <label>
                Duration
              </label>
              <select
                value={formData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                style={{
                    width:"stretch",
                  padding: "10px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "6px",
                  fontSize: "14px",
                  backgroundColor: "white",
                  color: "#333",
                  cursor: "pointer"
                }}
              >
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div>
              <label>
                User Limit
              </label>
              <input
                type="text"
                value={formData.userLimit}
                placeholder="0"
                onChange={(e) => handleInputChange("userLimit", e.target.value)}
                style={{
                    width:"stretch",
                  padding: "10px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "6px",
                  fontSize: "14px",
                  color: "#999"
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <label>Features</label>
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
                  fontWeight: "500"
                }}
              >
                + Add Feature
              </button>
            </div>
            {formData.features.map((feature, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
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
                    color: "#999"
                  }}
                />
                <Trash2
                  size={18}
                  style={{ color: "#dc3545", cursor: "pointer" }}
                  onClick={() => handleRemoveFeature(idx)}
                />
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", gap: "15px", marginTop: "30px" }}>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                padding: "12px",
                border: "1px solid #e0e0e0",
                borderRadius: "6px",
                background: "white",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500"
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              style={{
                flex: 1,
                padding: "12px",
                border: "none",
                borderRadius: "6px",
                background: "#5C308D",
                color: "white",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500"
              }}
            >
              {mode === "add" ? "Create Package" : "Save Changes"}
            </button>
          </div>
        </div>
    </Modal>
  )
}

export default PackageModal