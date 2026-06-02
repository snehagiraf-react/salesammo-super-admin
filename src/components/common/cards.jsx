import CardGrid from "./CardGrid";

// Keep this component for pages that pass a pre-built card array (no fetching).
const Cards = ({ cardsData }) => {
  if (!Array.isArray(cardsData) || cardsData.length === 0) return null;
  return <CardGrid displayCards={cardsData} />;
};

export default Cards;
