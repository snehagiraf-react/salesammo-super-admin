import React from "react";
import { useState } from "react";
import "../../assets/styles/cards.css";
import { MoveDown, TrendingUp, MoreVertical, Edit2, Trash2 } from "lucide-react";

const Cards = ({ cardsData, hideMenu }) => {
  const [openMenu, setOpenMenu] = useState(null);
  if (!cardsData || !Array.isArray(cardsData) || cardsData.length === 0) return null;
  return (
    <>
      <div className="cards-container">
        <div className="card-body">
          {cardsData.map((card, index) => (
            <div className="cardItem" key={index} style={{ background: card.bg || undefined, color: card.color || undefined }}>
              {card.trend !== undefined || !card.icon ? (
                <div className="card-content">
                  <div className="card-top-row">
                    <h3 className="card-title" style={{ color: card.color || undefined }}>{card.title}</h3>
                    {card.trend && (
                      <span className={`card-trend ${card.isPositive !== false ? "positive" : "negative"}`}>
                        {card.isPositive !== false ? <TrendingUp size={13} /> : <MoveDown size={13} />}
                        {card.trend}
                      </span>
                    )}
                  </div>
                  <p className="card-value" style={{ color: card.valueColor || card.color || undefined }}>{card.value}</p>
                </div>
              ) : (
                <div className="card-category">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%" }}>
                    <div style={{ flex: 1 }}>
                      <div
                        className="card-icon-category"
                        style={{
                          color: card.textColor || "#5C308D",
                          background: card.backgroundColor || "#F3F0F7"
                        }}
                      >
                        {card.icon}
                      </div>
                      <h3 className="card-title-category">{card.title}</h3>
                      <p className="card-value" style={{ color: card.valueColor || card.color || undefined }}>{card.value}</p>
                    </div>
                    {!hideMenu && (
                      <div style={{ position: "relative" }}>
                        <button
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "8px",
                            display: "flex",
                            alignItems: "center",
                            color: "#999"
                          }}
                          onClick={() => setOpenMenu(openMenu === index ? null : index)}
                        >
                          <MoreVertical size={20} />
                        </button>
                        {openMenu === index && (
                          <div style={{
                            position: "absolute",
                            top: "100%",
                            right: 0,
                            background: "white",
                            border: "1px solid #e0e0e0",
                            borderRadius: "8px",
                            minWidth: "150px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            zIndex: 10
                          }}>
                            <button
                              style={{
                                width: "100%",
                                padding: "10px 16px",
                                border: "none",
                                background: "none",
                                textAlign: "left",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                fontSize: "14px",
                                color: "#333",
                                borderBottom: "1px solid #f0f0f0"
                              }}
                              onClick={() => setOpenMenu(null)}
                            >
                              <Edit2 size={16} /> Edit
                            </button>
                            <button
                              style={{
                                width: "100%",
                                padding: "10px 16px",
                                border: "none",
                                background: "none",
                                textAlign: "left",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                fontSize: "14px",
                                color: "#d32f2f"
                              }}
                              onClick={() => setOpenMenu(null)}
                            >
                              <Trash2 size={16} /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cards;
