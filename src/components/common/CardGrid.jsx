import React from "react";
import "../../assets/styles/cards.css";
import { MoveDown, TrendingUp } from "lucide-react";

export default function CardGrid({ displayCards = [] }) {
  if (!displayCards.length) return null;

  return (
    <div className="cards-container">
      <div className="card-body">
        {displayCards.map((card, index) => (
          <div
            className="cardItem"
            key={card.id ?? index}
            style={{
              background: card.bg || undefined,
              color: card.color || undefined,
            }}
          >
            {card.trend !== undefined || !card.icon ? (
              <div className="card-content">
                <div className="card-top-row">
                  <h3
                    className="card-title"
                    style={{ color: card.color || undefined }}
                  >
                    {card.title}
                  </h3>
                  {card.trend && (
                    <span
                      className={`card-trend ${card.isPositive !== false ? "positive" : "negative"}`}
                    >
                      {card.isPositive !== false ? (
                        <TrendingUp size={13} />
                      ) : (
                        <MoveDown size={13} />
                      )}
                      {card.trend}
                    </span>
                  )}
                </div>
                <p
                  className="card-value"
                  style={{
                    color: card.valueColor || card.color || undefined,
                  }}
                >
                  {card.value}
                </p>
              </div>
            ) : (
              <div className="card-category">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    width: "100%",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      className="card-icon-category"
                      style={{
                        color: card.textColor || "#5C308D",
                        background: card.backgroundColor || "#F3F0F7",
                      }}
                    >
                      {card.icon}
                    </div>
                    <h3 className="card-title-category">{card.title}</h3>
                    <p
                      className="card-value"
                      style={{
                        color: card.valueColor || card.color || undefined,
                      }}
                    >
                      {card.value}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

